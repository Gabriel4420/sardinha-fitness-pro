import { EMPTY_PRODUCT, type ProductDraft } from "./product";

type ImportRecord = Record<string, unknown>;

const aliases = {
  name: ["name", "nome", "produto", "product"],
  category: ["category", "categoria", "grupo"],
  description: ["description", "descricao", "descrição", "detalhes"],
  specifications: ["specifications", "especificacoes", "especificações", "ficha tecnica"],
  highlights: ["highlights", "destaques", "beneficios", "benefícios"],
  image_url: ["image_url", "imagem", "imagem_url", "foto"],
  published: ["published", "publicado", "publicar"],
  sort_order: ["sort_order", "ordem", "posicao", "posição"],
} satisfies Record<keyof ProductDraft, string[]>;

const normalizeKey = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

const readValue = (record: ImportRecord, field: keyof ProductDraft) => {
  const entry = Object.entries(record).find(([key]) =>
    aliases[field].some((alias) => normalizeKey(alias) === normalizeKey(key)),
  );
  return entry?.[1];
};

const asText = (value: unknown) =>
  Array.isArray(value) ? value.map(String).join("\n") : value == null ? "" : String(value).trim();

export function normalizeImportedProducts(records: ImportRecord[]): ProductDraft[] {
  return records
    .map((record, index) => {
      const name = asText(readValue(record, "name"));
      if (!name) return null;
      const publishedValue = readValue(record, "published");
      return {
        ...EMPTY_PRODUCT,
        name,
        category: asText(readValue(record, "category")) || EMPTY_PRODUCT.category,
        description: asText(readValue(record, "description")),
        specifications: asText(readValue(record, "specifications")),
        highlights: asText(readValue(record, "highlights")),
        image_url: asText(readValue(record, "image_url")),
        published:
          publishedValue == null
            ? true
            : !["false", "0", "nao", "não"].includes(normalizeKey(String(publishedValue))),
        sort_order: Number(readValue(record, "sort_order")) || index,
      } satisfies ProductDraft;
    })
    .filter((product): product is ProductDraft => product !== null);
}

function recordsFromText(text: string): ImportRecord[] {
  const blocks = text
    .replace(/\r/g, "")
    .split(/\n\s*\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  const labeled = blocks.map((block) => {
    const record: ImportRecord = {};
    let currentKey = "";
    for (const line of block.split("\n").map((value) => value.trim()).filter(Boolean)) {
      const match = line.match(/^([^:]{2,40}):\s*(.*)$/);
      if (match) {
        currentKey = match[1];
        record[currentKey] = match[2];
      } else if (currentKey) {
        record[currentKey] = `${record[currentKey]}\n${line}`;
      } else if (!record.nome) {
        record.nome = line;
      }
    }
    return record;
  });

  return labeled;
}

export async function parseCatalogFile(file: File): Promise<ProductDraft[]> {
  const extension = file.name.split(".").pop()?.toLowerCase();
  let records: ImportRecord[] = [];

  if (extension === "json") {
    const parsed: unknown = JSON.parse(await file.text());
    const value = Array.isArray(parsed)
      ? parsed
      : (parsed as { products?: unknown; produtos?: unknown; catalogo?: unknown }).products ??
        (parsed as { produtos?: unknown }).produtos ??
        (parsed as { catalogo?: unknown }).catalogo;
    if (!Array.isArray(value)) throw new Error("O JSON deve conter uma lista de produtos.");
    records = value as ImportRecord[];
  } else if (extension === "xlsx" || extension === "xls") {
    const { default: readXlsxFile } = await import("read-excel-file/browser");
    const sheets = await readXlsxFile(file);
    const rows = sheets[0]?.data ?? [];
    if (rows.length < 2) throw new Error("A planilha precisa ter cabeçalho e ao menos um produto.");
    const headers = rows[0].map(String);
    records = rows.slice(1).map((row) =>
      Object.fromEntries(headers.map((header, index) => [header, row[index]])),
    );
  } else if (extension === "docx") {
    const mammoth = await import("mammoth");
    const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
    records = recordsFromText(result.value);
  } else if (extension === "pdf") {
    const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const worker = await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url");
    pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
    const document = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
    const pages: string[] = [];
    for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
      const page = await document.getPage(pageNumber);
      const content = await page.getTextContent();
      pages.push(content.items.map((item) => ("str" in item ? item.str : "")).join("\n"));
    }
    records = recordsFromText(pages.join("\n\n"));
  } else {
    throw new Error("Formato não suportado. Use PDF, XLSX, DOCX ou JSON.");
  }

  const products = normalizeImportedProducts(records);
  if (!products.length) {
    throw new Error("Nenhum produto com nome foi identificado no arquivo.");
  }
  return products;
}
