import { TabContent, TabGroup, TabItem } from '@/components/tabs';
import { Chat } from './main/chat';
import { FileExplorer } from './main/file-explorer';
import { Header } from './main/header';
import { Logs } from './main/logs';
import { Preview } from './main/preview';

export default function Page() {
  return (
    <div className="flex h-screen max-h-screen flex-col space-x-2 space-y-2 overflow-hidden p-2">
      <Header className="flex w-full items-center" />
      <ul className="mt-1.5 flex space-x-5 px-1 font-mono text-sm tracking-tight lg:hidden">
        <TabItem tabId="chat">Chat</TabItem>
        <TabItem tabId="preview">Preview</TabItem>
        <TabItem tabId="file-explorer">File Explorer</TabItem>
        <TabItem tabId="logs">Logs</TabItem>
      </ul>
      <div className="flex min-h-0 w-full flex-1 overflow-hidden lg:space-x-2">
        <TabContent
          className="h-full min-h-0 w-full flex-col lg:flex lg:w-1/2"
          tabId="chat"
        >
          <Chat className="flex-1 overflow-hidden" />
        </TabContent>
        <TabGroup tabId="chat">
          {/* Preview - now contains both web preview and code view */}
          <TabContent className="lg:h-2/3" tabId="preview">
            <Preview className="flex-1 overflow-hidden" />
          </TabContent>

          {/* File Explorer - ONLY visible on mobile */}
          <TabContent className="lg:hidden" tabId="file-explorer">
            <FileExplorer className="flex-1 overflow-hidden" />
          </TabContent>

          <TabContent className="lg:h-1/3" tabId="logs">
            <Logs className="flex-1 overflow-hidden" />
          </TabContent>
        </TabGroup>
      </div>
    </div>
  );
}
