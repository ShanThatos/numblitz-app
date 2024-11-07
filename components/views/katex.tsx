import { buildKatexHtmlPage } from "~/lib/html";
import { AutoHeightWebView } from "./html";

interface KatexWebViewProps {
  source: string;
  options?: unknown;
}
export const KatexWebView = ({ source, options }: KatexWebViewProps) => {
  return <AutoHeightWebView source={buildKatexHtmlPage(source, options)} />;
};
