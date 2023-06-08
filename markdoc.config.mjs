import { defineMarkdocConfig } from "@astrojs/markdoc/config";

import AmazonBookPreview from "./src/components/AmazonBookPreview.astro";

export default defineMarkdocConfig({
  tags: {
    book: {
      render: AmazonBookPreview,
      attributes: {
        iframeURL: { type: String },
      },
    },
  },
});
