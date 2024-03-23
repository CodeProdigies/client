/**
 * Implementation of the server user class.
 */
export default class User {
	public readonly id: string = '0'
	public username: string = ''
	public password: string = ''

	public email: string = ''
	public firstName: string = ''
	public lastName: string = ''
	public dateOfBirth: Date | null = null
	public createdAt: Date = new Date()

	public address?: string
	public city?: string
	public state?: string
	public zipCode?: string
	public country?: string

	public phone?: string
	public mobile?: string

	public name: string = ''

	constructor(user: Partial<IUser>) {
		Object.assign(this, user)
	}
}

export class PasswordForm {
	oldPassword: string = ''
	newPassword: string = ''
	confirmNewPassword: string = ''
}

export class SignupForm {
	constructor(
		public username: string = '',
		public email: string = '',
		public password: string = '',
		public firstName: string = '',
		public lastName: string = '',
		public dateOfBirth?: Date
	) {}
}

export interface IUser extends User {}
