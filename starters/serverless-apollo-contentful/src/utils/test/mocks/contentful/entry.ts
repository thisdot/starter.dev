import { Entry, EntryProps, KeyValueMap, SysLink } from 'contentful-management';

const mockSysLink = (): SysLink => ({
	sys: {
		type: 'MOCK_SYSLINK_TYPE',
		linkType: 'MOCK_SYSLINK_LINK_TYPE',
		id: 'MOCK_SYSLINK_ID',
	},
});


export const mockEntry = (id: string, fields: KeyValueMap): Entry => ({
	sys: {
		space: mockSysLink(),
		contentType: mockSysLink(),
		environment: mockSysLink(),
		type: 'MOCK_ENTRY_SYS_TYPE',
		id,
		version: 123,
		createdAt: 'MOCK_CREATED_AT',
		updatedAt: 'MOCK_UPDATED_AT',
	},
	fields,
	toPlainObject: jest.fn<EntryProps<KeyValueMap>, []>(),
	update: jest.fn(),
	patch: jest.fn(),
	delete: jest.fn(),
	publish: jest.fn(),
	unpublish: jest.fn(),
	archive: jest.fn(),
	unarchive: jest.fn(),
	getSnapshots: jest.fn(),
	getSnapshot: jest.fn(),
	createComment: jest.fn(),
	getComments: jest.fn(),
	getComment: jest.fn(),
	createTask: jest.fn(),
	getTasks: jest.fn(),
	getTask: jest.fn(),
	isPublished: jest.fn(),
	isUpdated: jest.fn(),
	isDraft: jest.fn(),
	isArchived: jest.fn(),
	references: jest.fn(),
});
