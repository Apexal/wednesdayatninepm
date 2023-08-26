import { defineMarkdocConfig, component } from "@astrojs/markdoc/config";

export default defineMarkdocConfig({
  tags: {
    book: {
      render: component("./src/components/BookPreview.astro"),
      attributes: {
        iframeURL: { type: String },
      },
    },
  },
});
