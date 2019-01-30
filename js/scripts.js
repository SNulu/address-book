// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
    this.currentId = 0,
    this.contactAddresses = []
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.addEmail = function (contactAddress) {
  contactAddress.id = this.assignId();
  this.contactAddresses.push(contactAddress);
}

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}


AddressBook.prototype.findcontactAddress = function (id) {
  for (var i = 0; i < this.contactAddresses.length; i++) {
    if (this.contactAddresses[i]) {
      if (this.contactAddresses[i].id == id) {
        return this.contactAddresses[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

AddressBook.prototype.deletecontactAddress = function (id) {
  for (var i = 0; i < this.contactAddresses.length; i++) {
    if (this.contactAddresses[i]) {
      if (this.contactAddresses[i].id == id) {
        delete this.contactAddresses[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, address) {
  this.firstName = firstName,
    this.lastName = lastName,
    this.phoneNumber = phoneNumber,
    this.email = email,
    this.address = address
}

function contactAddresses(workEmail, otherEmail, personalEmail) {
  this.personalEmail = personalEmail,
    this.workEmail = workEmail,
    this.otherEmail = otherEmail
  // this.workAddress = workAddress,
  // this.homeAddress = homeAddress,
  // this.otherAddress = otherAddress
}

// Contact.prototype.workEmail = function() {
//   return this.workEmail+ " " + this.personalEmail;
// }


Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function (contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";

  });
  contactsList.html(htmlForContactInfo);
};



function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".address").html(contact.address);
  $(".email").html(contact.email);
  $(".personal-email").html(contact.emails.personalEmail);
  $(".work-email").html(contact.emails.workEmail);
  $(".other-email").html(contact.emails.otherEmail);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedAddress = $("input#new-address").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedWorkEmail = $("input#new-work-email").val();
    var inputtedPersonalEmail = $("input#new-personal-email").val();
    var inputtedOtherEmail = $("input#new-other-email").val();

    $("input#new-first-name").val();
    $("input#new-last-name").val();
    $("input#new-phone-number").val();
    $("input#new-email").val();
    $("input#new-work-email").val();
    $("input#new-personal-email").val();
    $("input#new-other-email").val();
    $("input#new-address").val();
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedAddress);
    var newContactAdresses = new contactAddresses(inputtedWorkEmail, inputtedPersonalEmail, inputtedOtherEmail)
    newContact.emails = newContactAdresses
    addressBook.addContact(newContact);
    addressBook.addEmail(newContactAdresses);
    displayContactDetails(addressBook);
  });
});
