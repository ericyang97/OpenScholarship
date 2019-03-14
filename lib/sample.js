'use strict';
//var NS = 'org.acme.mynetwork';

/**
 * Send the scholarship from scholarship admin's account to applicant's account
 * @param {org.acme.mynetwork.sendScholarship} sendScholarship - the scholarship to be processed
 * @transaction
 */
async function sendScholarship(sendScholarship) {
    const scholarshipAmount = sendScholarship.scholarship.amount;
    var scholarship = sendScholarship.scholarship;
    var sender = sendScholarship.admin;
    var recipitent = sendScholarship.applicant;

    if (scholarship.availability) {
        if (sender.balance >= scholarshipAmount) {
            sender.balance -= scholarshipAmount;
            recipitent.balance += scholarshipAmount;
        }
        else{
            console.log('Not enough balance in Admin account');
        } 
    }
    else{
        console.log('Scholarship is not avaiable!');
    }

    //Update the scholarship admin's account balance
    const scholarshipAdminRegistry = await getParticipantRegistry('org.acme.mynetwork.ScholarshipAdmin');
    await scholarshipAdminRegistry.update(sender);

    //Update the applicant's account balance
    const applicantRegistry = await getParticipantRegistry('org.acme.mynetwork.Applicant');
    await applicantRegistry.update(recipitent);
}