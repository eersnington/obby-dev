import { TabContent, TabGroup, TabItem } from '@/components/tabs';
import { Chat } from './chat';
import { FileExplorer } from './file-explorer';
import { Header } from './header';
import { Logs } from './logs';
import { Preview } from './preview';

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
          <TabContent className="lg:h-1/3" tabId="preview">
            <Preview className="flex-1 overflow-hidden" />
          </TabContent>
          <TabContent className="lg:h-1/3" tabId="file-explorer">
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
