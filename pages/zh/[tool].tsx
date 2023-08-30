// import data from "../src/data";

type _t = keyof typeof tool;

import Head from "next/head";
import NavBar from "../../components/NavBar";
import Tool from "../../components/Tool";
import { useRouter } from "next/router";
import {
  edit_page,
  nav_content,
  tool,
  tools,
  web2pdftool,
  downloadFile,
  translate_pdf,
} from "../../src/content/content-zh";
import { useEffect } from "react";
import { errors } from "../../src/content/content-zh";

type data_type = {
  title: string;
  description: string;
  color: string;
  type: string;
};

export async function getStaticPaths() {
  const paths = Object.keys(routes).map((key) => ({
    params: { tool: key.substring(1) },
  }));
  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({
  params,
}: {
  params: {
    tool: string;
  };
}) {
  const item = routes[`/${params.tool}` as keyof typeof routes].item;
  return { props: { item } };
}

export default ({ item, lang }: { item: data_type; lang: string }) => {
  const router = useRouter();
  let path = router.asPath;
  let appology_message = {
    title: "对不起，此功能尚未实现。",
    reason: `我们很抱歉给您带来的不便。该功能目前正在开发中，将在未来的更新中提供。感谢您的理解。`,
  };
  return (
    // Type '{ state: ToolState; dispatch: Dispatch<ToolAction>; }' is not assignable to type 'ToolState'.

    <>
      <Head>
        <title>PDFEquips | {item.title}</title>
        <meta name="description" content={item.description} />
        <link rel="icon" href="/logo.png" />
        {/* needed for styles */}
      </Head>
      <NavBar nav_content={nav_content} lang={lang} />
      {path == "/zh/split-pdf" ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h2 className="display-4 text-center">{appology_message.title}</h2>
          <p className="text-center">{appology_message.reason}</p>
        </div>
      ) : (
        <Tool
          tools={tools}
          data={item}
          lang={lang}
          errors={errors}
          edit_page={edit_page}
          pages={edit_page.pages}
          page={edit_page.page}
          web2pdftool={web2pdftool}
          downloadFile={downloadFile}
          translate_pdf={translate_pdf}
        />
      )}
    </>
  );
};

// export default ToolPage;
export const routes = {
  "/merge-pdf": { item: tool["Merge_PDF"] },
  "/split-pdf": { item: tool["Split_PDF"] },
  "/translate-pdf": { item: tool["Translate_PDF"] },
  "/compress-pdf": { item: tool["Compress_PDF"] },
  "/pdf-to-powerpoint": { item: tool["PDF_to_Powerpoint"] },
  "/jpg-to-pdf": { item: tool["JPG_to_PDF"] },
  "/word-to-pdf": { item: tool["WORD_to_PDF"] },
  "/powerpoint-to-pdf": { item: tool["POWERPOINT_to_PDF"] },
  "/excel-to-pdf": { item: tool["EXCEL_to_PDF"] },
  "/html-to-pdf": { item: tool["HTML_to_PDF"] },
  "/pdf-to-jpg": { item: tool["PDF_to_JPG"] },
  "/pdf-to-word": { item: tool["PDF_to_WORD"] },
  "/pdf-to-excel": { item: tool["PDF_to_EXCEL"] },
  "/pdf-to-pdf-a": { item: tool["PDF_to_PDF_A"] },
  "/web-to-pdf": { item: tool["Web_to_PDF"] },
  "/pdf-to-text": { item: tool["PDF_to_Text"] },
  "/pdf-to-html": { item: tool["PDF_to_HTML"] },
  "/pdf-to-markdown": { item: tool["PDF_to_Markdown"] },
};
