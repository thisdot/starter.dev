import { Meta, StoryFn } from '@storybook/react';
import {
	Icon,
	IconProps,
	IconMenu,
	IconClose,
	IconAccount,
	IconArrow,
	IconBag,
	IconCaret,
	IconCheck,
	IconFilters,
	IconHelp,
	IconLogin,
	IconRemove,
	IconSearch,
	IconSelect,
	IconXMark,
} from '../Icon';

export default {
	title: 'Components/Icons',
	component: Icon,
} as Meta;

export const IconMenuStory: StoryFn<IconProps> = args => <IconMenu {...args} />;

export const IconCloseStory: StoryFn<IconProps> = args => (
	<IconClose {...args} />
);

export const IconAccountStory: StoryFn<IconProps> = args => (
	<IconAccount {...args} />
);

export const IconArrowStory: StoryFn<IconProps> = args => (
	<IconArrow {...args} />
);

export const IconBagStory: StoryFn<IconProps> = args => <IconBag {...args} />;

export const IconCaretStory: StoryFn<IconProps> = args => (
	<IconCaret {...args} />
);

export const IconCheckStory: StoryFn<IconProps> = args => (
	<IconCheck {...args} />
);

export const IconFiltersStory: StoryFn<IconProps> = args => (
	<IconFilters {...args} />
);

export const IconHelpStory: StoryFn<IconProps> = args => <IconHelp {...args} />;

export const IconLoginStory: StoryFn<IconProps> = args => (
	<IconLogin {...args} />
);

export const IconRemoveStory: StoryFn<IconProps> = args => (
	<IconRemove {...args} />
);

export const IconSearchStory: StoryFn<IconProps> = args => (
	<IconSearch {...args} />
);

export const IconSelectStory: StoryFn<IconProps> = args => (
	<IconSelect {...args} />
);

export const IconXMarkStory: StoryFn<IconProps> = args => (
	<IconXMark {...args} />
);
