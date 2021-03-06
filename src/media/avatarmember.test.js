import React from 'react';
import { shallow } from 'enzyme';
import { MOCK_MEMBER } from 'meetup-web-mocks/lib/api';
import AvatarMember, { AVATAR_PERSON_CLASS, AVATAR_PERSON_NOPHOTO_CLASS } from './AvatarMember';
import Avatar from './Avatar';
import Icon from './Icon';

describe('AvatarMember', function() {
	it('exists', function() {
		const avatarMember = shallow(<AvatarMember member={MOCK_MEMBER} />);
		expect(avatarMember.exists()).toBe(true);
	});

	it('applies avatar--person variant class', function() {
		const avatarMember = shallow(<AvatarMember member={MOCK_MEMBER} />);
		expect(avatarMember.find(`.${AVATAR_PERSON_CLASS}`).exists()).toBe(true);
	});

	it('renders the noPhoto variant only when a photo is not present', function() {
		const MOCK_MEMBER_NO_PHOTO = { ...MOCK_MEMBER };
		MOCK_MEMBER_NO_PHOTO.photo = {};

		const avatarMember = shallow(<AvatarMember member={MOCK_MEMBER_NO_PHOTO} />);
		expect(avatarMember.find(`.${AVATAR_PERSON_NOPHOTO_CLASS}`).exists()).toBe(true);
	});

	it('should render member photo on large size', () => {
		const mockPhoto = 'photo image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, photo_link: mockPhoto },
		};
		const avatarMember = shallow(<AvatarMember member={mockMember} large />);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should render thumbnail photo on regular size', () => {
		const mockPhoto = 'photo image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, thumb_link: mockPhoto },
		};
		const avatarMember = shallow(<AvatarMember member={mockMember} />);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should render thumbnail photo on small size', () => {
		const mockPhoto = 'thumb image';
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, thumb_link: mockPhoto },
		};
		const avatarMember = shallow(<AvatarMember member={mockMember} small />);
		expect(avatarMember.find(Avatar).prop('src')).toBe(mockPhoto);
	});

	it('should *not* render the noPhoto variant only when a photo is present', function() {
		const mockMember = {
			...MOCK_MEMBER,
			photo: { ...MOCK_MEMBER.photo, thumb_link: 'test image' },
		};
		const avatarMember = shallow(<AvatarMember member={mockMember} />);
		expect(avatarMember.find(`.${AVATAR_PERSON_NOPHOTO_CLASS}`).exists()).toBe(false);
		expect(avatarMember.find(Icon).exists()).toBe(false);
	});

	it('applies variant classes for each variant prop', function() {
		const variants = ['org', 'fbFriend'];
		variants.forEach(variant => {
			const props = {
				[variant]: true,
				member: MOCK_MEMBER,
			};
			const avatarMember = shallow(<AvatarMember {...props} />);
			expect(avatarMember.find(`.avatar--${variant}`).exists()).toBe(true);
		});
	});
});
