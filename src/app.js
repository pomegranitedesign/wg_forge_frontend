import moment from 'moment'
import { orders, users, companies } from '../data'

const renderTableBody = () => {
	return orders.map((order) => {
		const user = users.find((user) => user.id === order.user_id)

		let company = 'Some cool company'
		if (user.company_id)
			company = companies.find(
				(company) => company.id === user.company_id
			)
		else company = 'Cool company'

		const formattedBirthday = moment
			.unix(user.birthday)
			.format('DD/MM/YYYY')

		const formattedCurrency = new Intl.NumberFormat('en-US', {
			maximumSignificantDigits: 3,
			currency: 'USD',
			style: 'currency'
		}).format(order.total)

		const formattedCardNumber =
			order.card_number.slice(0, 2) +
			'**********' +
			order.card_number.slice(order.card_number.length - 4)

		return `
			<tr>
				<td>order_${order.id}</td>
				<td class="user-data">
					<a href="#">
						${user.gender === 'Female'
							? 'Mrs.'
							: 'Mr.'} ${user.first_name} ${user.last_name}
					</a>
					<div class="user-details">
						<p>Birthday: ${formattedBirthday}</p>
						<p><img src="${user.avatar}" alt="User image" width="100px" /></p>
						<p>Company: <a href="${company.url}" target="__blank">${company.title}</a></p>
						<p>Industry: ${company.industry}</p>
					</div>
				</td>
				<td>${moment.unix(order.created_at).format('DD/MM/YY hh:mm:ss')}</td>
				<td>${formattedCurrency}</td>
				<td>${formattedCardNumber}</td>
				<td>${order.card_type}</td>
				<td>${order.order_country} ${order.order_ip}</td>
			</tr>
			`
	})
}

export default (function() {
	document.getElementById('app').innerHTML = `
	<table class="table">
    <thead>
			<tr>
				<th scope="col">Transaction ID</th>
				<th scope="col">User Info</th>
				<th scope="col">Order Date</th>
				<th scope="col">Order Amount</th>
				<th scope="col">Card Number</th>
				<th scope="col">Card Type</th>
				<th scope="col">Location</th>
			</tr>
		</thead>
		<tbody>
			${renderTableBody()}
		</tbody>
	</table>
	`
})()
