import Head from "next/head";
import NavBar from "@/components/NavBar/NavBar";
import Tool from "../components/Tool";
import {
  edit_page,
  errors,
  tool,
  tools,
  downloadFile,
} from "../src/content/content";

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

export default ({ item }: { item: data_type }) => {
  return (
    <>
      <Head>
        <title>{`PDFEquips | ${item.title}`}</title>
        <meta name="description" content={item.description} />
        <link rel="icon" href="/logo.png" />
        {/* needed for styles */}
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        />
      </Head>
      <NavBar lang="" />
      <Tool
        tools={tools}
        data={item}
        lang=""
        errors={errors}
        edit_page={edit_page}
        pages={edit_page.pages}
        page={edit_page.page}
        downloadFile={downloadFile}
      />
    </>
  );
};

// export default ToolPage;
export const routes = {
  "/ocr-pdf": { item: tool["Ocr_PDF"] },
};
