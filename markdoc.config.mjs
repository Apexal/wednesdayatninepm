import { defineMarkdocConfig } from "@astrojs/markdoc/config";

import BookPreview from "./src/components/BookPreview.astro";

export default defineMarkdocConfig({
  tags: {
    book: {
      render: BookPreview,
      attributes: {
        iframeURL: { type: String },
      },
    },
  },
});
