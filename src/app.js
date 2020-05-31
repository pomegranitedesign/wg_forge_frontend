import moment from 'moment'
import { orders, users, companies } from '../data'
import {
	formatCurrency,
	formatBirthday,
	formatCardNumber,
	sortBy
} from './misc'

const renderTableBody = (arr = []) => {
	return arr.map((order) => {
		const user = users.find((user) => user.id === order.user_id)

		let company = 'www.google.com'
		if (user.company_id)
			company = companies.find(
				(company) => company.id === user.company_id
			)

		const formattedBirthday = formatBirthday(user.birthday)
		const formattedCurrency = formatCurrency(order.total)
		const formattedCardNumber = formatCardNumber(order.card_number)

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
	let sortedOrders = [ ...orders ]

	const renderTable = (orders = []) => `
	<table class="table">
		<thead>
			<tr>
				<th scope="col">Transaction ID</th>
				<th scope="col" id="userInfoHead" style="cursor: pointer;">User Info</th>
				<th scope="col">Order Date</th>
				<th scope="col">Order Amount</th>
				<th scope="col">Card Number</th>
				<th scope="col">Card Type</th>
				<th scope="col" id="locationHead" style="cursor: pointer;">Location</th>
			</tr>
		</thead>
		<tbody>
			${renderTableBody(orders)}
		</tbody>
	</table>
`

	// ${renderTable(newOrders)}
	const updateUI = (newOrders = []) =>
		(document.getElementById('app').innerHTML = `
			<div>
				
				<h1>Hello World</h1>
			</div>
		`)

	updateUI(sortedOrders)

	// Sorting
	const userInfoHead = document.querySelector('#userInfoHead')
	userInfoHead.addEventListener('click', () => {
		sortedOrders = sortBy('userInfo', sortedOrders)
		updateUI(sortedOrders)
	})

	const locationHead = document.querySelector('#locationHead')
	locationHead.addEventListener('click', () => {
		sortedOrders = sortBy('location', sortedOrders)
		updateUI(sortedOrders)
	})
})()
