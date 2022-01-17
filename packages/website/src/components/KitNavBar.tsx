export function KitNavBar() {
  return (
    <nav className="-mb-px flex justify-center space-x-12" aria-label="Tabs">
      <a
        href="#"
        className="border-blue-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium"
      >
        Documentation
      </a>
      <a
        href="#"
        className="border-transparent text-gray-900 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium"
      >
        Demo(s)
      </a>
      <a
        href="#"
        className="border-transparent text-gray-900 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium"
        aria-current="page"
      >
        Related kits
      </a>
    </nav>
  );
}
