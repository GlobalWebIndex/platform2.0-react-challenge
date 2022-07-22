import React, { useState } from 'react';

interface AccordionItemProps {
  children?: React.ReactNode;
  title: string;
  active: boolean;
  onClick: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  children,
  title,
  onClick,
}) => {
  let [isActive, setIsActive] = useState<boolean>(false);

  return (
    <>
      <div className="accordion" id="accordionExample">
        <div
          className="accordion-item bg-white border rounded-lg border-gray-200 group "
          onClick={onClick}
        >
          <h2
            className="accordion-header mb-0 font-bold flex justify-center items-center group-hover:bg-gray-100"
            id="headingOne"
          >
            <div
              className="
              group-hover:bg-gray-100
                accordion-button
    
                flex
                
                w-full
                py-4
                px-5
              
                bg-white
                border-0
                rounded-none
                transition
                focus:outline-none
                cursor-pointer
                "
            >
              {title}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-5 cursor-pointer "
              viewBox="0 0 20 20"
              fill="currentColor"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                setIsActive(!isActive);
              }}
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </h2>
          {isActive && (
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body py-4 px-5">{children}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccordionItem;
