import "./App.css";
import { useState } from "react";
import Modal from "react-modal";

function App() {
  const [lead, setLead] = useState({});
  const [leadEmail, setLeadEmail] = useState("");
  const [found, showResult] = useState(false);
  const [notFoundError, setErrorVisible] = useState(false);
  const [clear, showClear] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const clickFunction = () => {
    if (leadEmail !== "") {
      fetchData();
    }
  };

  const clearFunction = () => {
    setLead({});
    setLeadEmail("");
    document.getElementById("leadEmail").value = "";
    showResult(false);
    setErrorVisible(false);
    showClear(false);
  };

  const handleInput = (event) => {
    setLeadEmail(event.target.value);
    setErrorVisible(false);
    //console.log("Input Value: ", event.target.value);
  };

  const fetchData = async () => {
    const result = await fetch(
      `/developer_api/v1/leads/search?emails=${leadEmail}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-PW-AccessToken": "7e21736f08f9f849d2ba150babf3e335",
          "X-PW-Application": "developer_api",
          "X-PW-UserEmail": "clientaccess@connex.digital",
        },
      }
    );
    console.log("Lead Info: ", result);
    //switch for result here
    var incoming_result = await result.json();
    if (incoming_result.length === 0) {
      setErrorVisible(true);
    } else {
      setLead(incoming_result[0]);
      showResult(true);
      showClear(true);
    }
  };

  return (
    <div className="App p-4 align-items-center">
      <div className="flex flex-wrap mx-3 mb-6">
        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="leadEmail"
            type="text"
            placeholder="Lead Email Address"
            onChange={handleInput}
          ></input>
        </div>
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-1 mr-1"
              onClick={clickFunction}
              id="searchLeadButton"
            >
              Search
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded my-1 mr-1"
              id="showModal"
              onClick={openModal}
            >
              Create Lead
            </button>
          </div>
        </div>
        {clear ? (
          <div className="w-full">
            <button
              className="bg-transparent hover:bg-blue-50 text-blue font-bold py-2 px-4 rounded my-1"
              onClick={clearFunction}
              id="clearLeadButton"
            >
              Clear Result
            </button>
          </div>
        ) : (
          <></>
        )}
        {notFoundError ? (
          <div className="w-full rounded bg-red-50 p-2">
            <div className="text-red-500 font-semibold">
              No Lead found for your search
            </div>
          </div>
        ) : (
          <></>
        )}
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
          <form class="w-full max-w-lg">
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  placeholder="Jane"
                ></input>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-last-name"
                  type="text"
                  placeholder="Doe"
                ></input>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Email Address
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="email"
                  placeholder="lead@address.com"
                ></input>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-password"
                >
                  Street Address
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-password"
                  type="text"
                  placeholder="Enter the Street Address"
                ></input>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  City
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="Albuquerque"
                ></input>
              </div>
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  State
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>New Mexico</option>
                    <option>Missouri</option>
                    <option>Texas</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-city"
                >
                  City
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-city"
                  type="text"
                  placeholder="Albuquerque"
                ></input>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  State
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                  >
                    <option>New Mexico</option>
                    <option>Missouri</option>
                    <option>Texas</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      class="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-zip"
                >
                  Zip
                </label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-zip"
                  type="text"
                  placeholder="90210"
                ></input>
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded my-1 mr-1"
                  id="saveLeadButton"
                >
                  Save
                </button>
              </div>
              <div class="w-full md:w-1/2 px-3">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-1 mr-1"
                  id="cancelLeadButton"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
      {found ? (
        <div className="p-4">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Name</dt>
              <dd class="mt-1 text-sm text-teal-900 font-bold" id="lead_name">
                {lead.name}
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-teal-900 font-bold" id="lead_email">
                {lead.email.email}
              </dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Phone</dt>
              <dd class="mt-1 text-sm text-teal-900 font-bold" id="lead_phone">
                {lead.phone_numbers[0].number} ({lead.phone_numbers[0].category}
                )
              </dd>
            </div>

            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500">Company</dt>
              <dd
                class="mt-1 text-sm text-teal-900 font-bold"
                id="lead_company"
              >
                {lead.company_name === null ? "N/A" : lead.company_name}
              </dd>
            </div>

            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">Address</dt>
              <dd class="mt-1 max-w-prose text-sm text-teal-900 font-bold space-y-5">
                <p id="lead_address_1">
                  {lead.address.street}
                  {lead.address.city}
                </p>
                <p id="lead_address_2">
                  {lead.address.state}
                  {lead.address.postal_code}
                </p>
              </dd>
            </div>
          </dl>
          <div class="flex flex-wrap mx-3 mb-6">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <button
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onclick="convertLeadToPerson()"
                id="convertLeadToPersonButton"
              >
                Convert Lead to Person
              </button>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <button
                class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                onclick="convertLeadToCompany()"
                id="convertLeadToPersonButton"
              >
                Convert Lead to Company
              </button>
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <button
                class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                onclick="convertLeadToOpportunity()"
                id="convertLeadToPersonButton"
              >
                Convert Lead to Opportunity
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
