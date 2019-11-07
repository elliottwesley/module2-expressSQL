const models = require('../models')

// Load the index page (landing.pug) on GET
exports.get_landing = function(req, res, next) {
	res.render('landing', { title: 'Express' });
}

// Submit a created lead on POST
exports.submit_lead = function(req, res, next) {
	return models.Lead.create({
		email: req.body.lead_email
	}).then(lead => {
		res.redirect('/leads');
	})
}

// Show all leads on GET
exports.show_leads = function(req, res, next) {
	return models.Lead.findAll().then(leads => {
		res.render('landing', { title: 'Express', leads: leads });
	})
}

// Show individual lead on GET
exports.show_lead = function(req, res, next) {
	return models.Lead.findOne({
		where: {
			id: req.params.lead_id
		}
	}).then(lead => {
		res.render('lead', {lead: lead});
	});
}

// Show edit lead on GET
exports.show_edit_lead = function(req, res, next) {
	return models.Lead.findOne({
		where: {
			id: req.params.lead_id
		}
	}).then(lead => {
		res.render('lead/edit_lead', {lead: lead});
	});
}

// Edit (update) lead on POST
exports.edit_lead = function(req, res, next) {
	return models.Lead.update({
		email: req.body.lead_email
	}, {
		where: {
			id: req.params.lead_id
		}
	}).then(result => {
		res.redirect('/lead/' + req.params.lead_id);
	});
}