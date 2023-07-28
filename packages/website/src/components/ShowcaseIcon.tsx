import { GitHubIcon, BriefcaseIcon } from '../icons';

function getIcon(icon) {
  let Icon;
  switch (icon) {
    case 'GitHub':
      Icon = <GitHubIcon className="inline w-6 h-6 mb-px" />;
      break;
    default:
      Icon = <BriefcaseIcon className="inline w-6 h-6 mb-px" />;
  }

  return Icon;
}

interface Props {
  icon?: string;
}

export default function ShowcaseIcon({ icon }: Props) {
  return (
    <div className="justify-center p-1.5 border dark:bg-gray-800 group-hover:bg-blue-500 border-gray-400 dark:border-gray-700 rounded-xl flex items-center font-medium min-w-[48px] min-h-[48px]">
      {getIcon(icon)}
    </div>
  );
}
