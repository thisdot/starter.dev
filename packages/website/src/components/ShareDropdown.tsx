import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ShareIcon, FacebookIcon, TwitterIcon, LinkedinIcon } from '../icons';

type ShareOption = 'facebook' | 'twitter' | 'linkedin';

type ShareParam = { url: string; text: string };
const shareUrlMap: Record<ShareOption, (p: ShareParam) => string> = {
  facebook: ({ url }) => `https://www.facebook.com/sharer/sharer.php?t=${url}`,
  twitter: ({ text }) => `https://twitter.com/intent/tweet?text=${text}`,
  linkedin: ({ url }) =>
    `https://linkedin.com/sharing/share-offsite/?url=${url}`,
};
interface Props {
  kitname: string;
}

export function ShareDropdown({ kitname }: Props) {
  const share_url = window.location.href;
  const share_text = `I just used the ${kitname} kit by starter.dev to scaffold out my last project. It really allowed me to start building features immediately. Check out the kit: ${share_url}`;

  const share = (option: ShareOption) => {
    const url = shareUrlMap[option]({ url: share_url, text: share_text });
    window.open(url, '_blank');
  };

  return (
    <Menu as="span" className="relative inline-block text-left">
      <Menu.Button className="link text-sm dark:dark-link">
        <ShareIcon className="h-3.5 w-3.5 inline ml-1 mb-[2px]" />
        <span className="ml-1">Share Kit</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 dark:divide-gray-500 rounded-md bg-white dark:dark-bg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <button
                onClick={() => share('facebook')}
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-light hover:bg-gray-200 dark:dark-t hover:dark:bg-gray-700"
              >
                <FacebookIcon className="text-[#4267B2] dark:dark-t inline w-5 h-5 mr-1.5 mb-0.5" />
                Facebook
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={() => share('twitter')}
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-200 dark:dark-t hover:dark:bg-gray-700"
              >
                <TwitterIcon className="text-[#00acee] h-5 w-5 inline mr-1.5 mb-0.5" />
                Twitter
              </button>
            </Menu.Item>
            <Menu.Item>
              <button
                onClick={() => share('linkedin')}
                className="group flex w-full items-center rounded-md px-2 py-2 text-sm hover:bg-gray-200 dark:dark-t hover:dark:bg-gray-700"
              >
                <LinkedinIcon className="h-5 w-5 inline mr-1.5 mb-0.5" />
                Linkedin
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
