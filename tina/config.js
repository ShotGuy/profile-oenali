import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "berita",
        label: "Berita",
        path: "src/content/berita",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Judul Berita",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Tanggal Terbit",
            required: true,
          },
          {
            type: "string",
            name: "summary",
            label: "Ringkasan Singkat",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "image",
            label: "Gambar Utama",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Isi Berita",
            isBody: true,
          },
        ],
      },
      {
        name: "galeri",
        label: "Galeri Foto",
        path: "src/data",
        match: {
          include: "galeri",
        },
        format: "json",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "photos",
            label: "Daftar Foto",
            ui: {
              itemProps: (item) => {
                return { label: item?.title || "Foto Baru" };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Judul Foto",
              },
              {
                type: "string",
                name: "category",
                label: "Kategori",
                options: [
                  "Kegiatan",
                  "Pembangunan",
                  "Keindahan Alam"
                ],
              },
              {
                type: "image",
                name: "imageUrl",
                label: "Upload Gambar",
              }
            ],
          },
        ],
      },
    ],
  },
});
