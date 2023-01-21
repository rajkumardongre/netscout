const Bus = require('../models/Bus.model');

const addBus = async (req, res, next) => {
	const newBus = new Bus({
		start: req.body.start,
		end: req.body.end,
		avgSpeed: req.body.avgSpeed,
		stations: req.body.stations,
	});
	try {
		const savedBus = await newBus.save();
		res.status(201).json(savedBus);
	} catch (err) {
		res.status(401).json(err.message);
	}
};

const showBus = async (req, res, next) => {
	const id = '63cbfd902c34a6184c5b3957';
	const bus = await Bus.findById(id);
	res.render('ticket', { bus });
};

const addTicket = async (req, res, next) => {
	try {
		req.body.noOfPeople = Number(req.body.noOfPeople);
		let bus = await Bus.findById(req.params.id);
		let updatedBus = await bus.updateOne(
			{
				$push: { tickets: { from: req.body.from, to: req.body.to, noOfPeople: req.body.noOfPeople } },
			},
			{ new: true }
		);
		bus = await Bus.findById(req.params.id);
		bus.tickets = bus.tickets.filter((ticket) => ticket.to !== req.body.from);

		let totalPeople = bus.tickets.reduce((total, ticket) => {
			return total + ticket.noOfPeople;
		}, 0);
		updatedBus = await bus.updateOne(
			{
				$set: { tickets: bus.tickets, totalPeople: totalPeople },
			},
			{ new: true }
		);
		// console.log(totalPeople + Number(req.body.noOfPeople));
		// res.status(201).json(updatedBus);
		console.log(req.body);
		res.render('ticket_popup', {
			from: req.body.from,
			to: req.body.to,
			noOfPeople: req.body.noOfPeople,
			time: new Date(),
		});
	} catch (err) {
		res.status(401).json(err.message);
	}
};

const getTotalPeople = async (req, res) => {
	const bus = await Bus.find();
	const tickets = [...bus.tickets];
	const totalPeople = tickets.reduce((total, ticket) => {
		return total + ticket.noOfPeople;
	}, 0);
	res.send(totalPeople);
};

const getcurrentStatus = async (req, res) => {
	const bus = await Bus.find();
	// console.log(bus[]);
	let tickets = bus[0].tickets;
	const totalPeople = tickets.reduce((total, ticket) => {
		return total + ticket.noOfPeople;
	}, 0);
	const sortByDate = (arr) => {
		const sorter = (a, b) => {
			return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
		};
		arr.sort(sorter);
	};
	sortByDate(tickets);
	// console.log(tickets);
	const currLocation = {
		location: tickets[0].from,
		time: tickets[0].timestamp,
	};
	const locNames = bus[0].stations.map((st) => st.name);
	const currLocIndex = locNames.indexOf(currLocation.location);
	if (currLocIndex + 1 === bus[0].stations.length) {
		currLocIndex--;
	}
	let nextLoc = locNames[currLocIndex + 1];
	const distance = bus[0].stations[currLocIndex + 1].distance;

	// console.log(nextLoc, distance);
	const time = (distance / bus[0].avgSpeed) * 60;
	// console.log(time);
	res.render('user', { totalPeople, currLocation, time, nextLoc, start: bus[0].start, end: bus[0].end });
};

const datavisualization = async(req,res) => {
	res.redirect("http://localhost:8501/");
}


module.exports = {
	addBus,
	addTicket,
	getTotalPeople,
	getcurrentStatus,
	showBus,
	datavisualization,
};
