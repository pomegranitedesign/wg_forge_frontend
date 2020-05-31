import moment from 'moment'
import { users } from '../data'

export const formatCurrency = (n = 0) =>
	new Intl.NumberFormat('en-US', {
		maximumSignificantDigits: 3,
		currency: 'USD',
		style: 'currency'
	}).format(n)

export const formatBirthday = (birthday = '') =>
	moment.unix(birthday).format('DD/MM/YYYY')

export const formatCardNumber = (cardNumber = '') =>
	cardNumber.slice(0, 2) +
	'**********' +
	cardNumber.slice(cardNumber.length - 4)

export const sortBy = (value = '', arr = []) => {
	switch (value) {
		case 'location':
			return arr.sort(
				(a, b) =>
					a.order_country > b.order_country && a.order_ip > b.order_ip
						? 1
						: -1
			)

		case 'userInfo':
			return arr.sort((a, b) => {
				const aUser = users.find((user) => user.id === a.user_id)
				const bUser = users.find((user) => user.id === b.user_id)
				const aFullName = aUser.first_name + aUser.last_name
				const bFullName = bUser.first_name + bUser.last_name
				return aFullName > bFullName ? 1 : -1
			})

		default:
			return arr
	}
}
