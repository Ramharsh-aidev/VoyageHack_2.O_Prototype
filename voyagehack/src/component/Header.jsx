import { useState } from 'react';
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react';
import { ArrowPathIcon, ChartPieIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Import Bars3Icon and XMarkIcon here
import { CreditCardIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Logo from '../images/Website_Logo.jpeg';

const products = [
  {
    name: 'AI-Powered Trip Planner',
    description: 'Plan trip with AI-driven suggestions, personalized itineraries & recommendations on your preferences',
    href: 'ai-trip-planner',
    icon: CreditCardIcon
  },
  {
    name: 'Booking Integration',
    description: 'Book hotels, flights, and activities directly through the platform.',
    href: 'booking-integration',
    icon: ArrowPathIcon
  },
  {
    name: 'Budget Tracker',
    description: 'Keep track of your travel expenses and ensure your trip stays within budget.',
    href: 'budget-tracker',
    icon: ChartPieIcon
  },
  {
    name: 'Local Insights',
    description: 'Get insider tips on local attractions, dining, and culture at your travel destination.',
    href: 'local-insights',
    icon: MapPinIcon
  },
];

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

const Loader = () => (
  <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-opacity-50 bg-gray-500 z-50">
    <div className="relative">
      <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
      <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
      </div>
    </div>
  </div>
);


export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <header className="bg-lightBlue shadow-lg rounded-b-lg">
      {isLoading && <Loader />} {/* Render loader when isLoading is true */}
      {/* Wrap the navbar in a div with max-width and centered alignment */}
      <div className="mx-auto">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 rounded-b-lg shadow-lg">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">TravelLovers</span>
              <img
                alt="Logo"
                src={Logo}
                className="h-16 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 text-lg font-semibold text-gray-900">
                Product
                <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
              </PopoverButton>

              <PopoverPanel
                transition
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              >
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                      </div>
                      <div className="flex-auto">
                        <button onClick={() => {
                          setIsLoading(true);
                          setTimeout(() => {
                            setIsLoading(false);
                            window.location.href = item.href;
                          }, 500); // Simulate loading for 0.5 seconds
                        }} className="block font-semibold text-gray-900">
                          {item.name}
                        </button>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => window.location.href = item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                      {item.name}
                    </button>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <button onClick={() => window.location.href = '#'} className="text-lg font-semibold text-gray-900">
              Features
            </button>
            <button onClick={() => window.location.href = '#'} className="text-lg font-semibold text-gray-900">
              Marketplace
            </button>
            <button onClick={() => window.location.href = '#'} className="text-lg font-semibold text-gray-900">
              Company
            </button>
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
            <button
              onClick={() => window.location.href = '#'}
              className="px-6 py-2 text-lg font-semibold text-indigo-600 bg-white border-2 border-indigo-600 rounded-lg shadow-lg hover:bg-indigo-100 hover:shadow-xl transition-all duration-300"
            >
              Log in <span aria-hidden="true">→</span>
            </button>
            <button
              onClick={() => window.location.href = '#'}
              className="px-6 py-2 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Sign Up <span aria-hidden="true">→</span>
            </button>
          </div>
        </nav>
      </div>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">TravelLovers</span>
              <img
                alt="Logo"
                src={Logo}
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Product
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...products, ...callsToAction].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="button"
                        onClick={() => {
                          setIsLoading(true);
                          setTimeout(() => {
                            setIsLoading(false);
                            window.location.href = item.href;
                          }, 500); // Simulate loading for 0.5 seconds
                        }}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <button onClick={() => window.location.href = '#'} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  Features
                </button>
                <button onClick={() => window.location.href = '#'} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  Marketplace
                </button>
                <button onClick={() => window.location.href = '#'} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50">
                  Company
                </button>
              </div>
              <div className="py-6">
                <button
                  onClick={() => window.location.href = '#'}
                  className="inline-block rounded-lg px-6 py-2.5 text-base font-semibold text-gray-900 bg-transparent border-2 border-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}