import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { MvpData } from '../types/mvps';

type Mvp = Omit<MvpData, 'propertyTable'>;

type MvpSelectProps = {
  value: Mvp;
  onChange: (mvp: Mvp) => void;
  mvps: Mvp[];
};

export default function MvpSelect({ value, onChange, mvps }: MvpSelectProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <div className="flex flex-col gap-1">
          <Listbox.Label className="text-white">Mvp</Listbox.Label>
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{value.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {mvps.map((mvp, index) => (
              <Listbox.Option
                key={mvp.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 z-10 ${
                    active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                  }`
                }
                value={mvp}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {mvp.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
