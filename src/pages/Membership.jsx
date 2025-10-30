// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useGetMembersListQuery } from "../features/member/memberApiIn";
// import { clearSearch } from "../features/member/memberSearchSlice";
// import Fuse from "fuse.js";

// import MemberCard from "../components/MemberCard/MemberCard";
// import SearchMember from "../components/SearchMember/SearchMember";
// import HomeLoading from "../components/UI/HomeLoading";
// import ErrorShow from "../components/UI/ErrorShow";

// const PaginateButton = React.memo(
//   ({ number, onClick, isActive, children, disabled }) => (
//     <li
//       className={`page-item ${isActive ? "active" : ""} ${
//         disabled ? "disabled" : ""
//       }`}
//     >
//       <button
//         onClick={() => onClick(number)}
//         className="page-link"
//         disabled={disabled}
//       >
//         {children || number}
//       </button>
//     </li>
//   )
// );

// export default function Membership() {
//   const dispatch = useDispatch();
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 80;

//   const { search: searchTerm } = useSelector((state) => state.memberSearch);
//   const { data: membersData, isLoading, isError } = useGetMembersListQuery();
//   console.log(membersData);

//   // Fuse.js search config
//   const fuseOptions = useMemo(
//     () => ({
//       keys: [
//         "name",
//         "membership_number",
//         "organization_name",
//         "designation_name",
//         "occupation",
//         "phone_number",
//         "hsc_passing_year",
//         "email",
//         "session",
//       ],
//       threshold: 0.3,
//     }),
//     []
//   );

//   // Reset search when component unmounts
//   useEffect(() => {
//     return () => {
//       dispatch(clearSearch());
//     };
//   }, [dispatch]);

//   // Search and filter logic
//   useEffect(() => {
//     if (!membersData?.result) return;

//     const fuse = new Fuse(membersData.result, fuseOptions);
//     const results = searchTerm
//       ? fuse.search(searchTerm).map((res) => res.item)
//       : membersData.result;

//     setFilteredMembers([...results].sort((a, b) => b.id - a.id));
//     setCurrentPage(1);
//   }, [membersData, searchTerm, fuseOptions]);

//   // Pagination
//   const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
//   const currentItems = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredMembers.slice(start, start + itemsPerPage);
//   }, [filteredMembers, currentPage]);

//   const handlePageChange = useCallback(
//     (pageNumber) => {
//       if (pageNumber > 0 && pageNumber <= totalPages) {
//         setCurrentPage(pageNumber);
//       }
//     },
//     [totalPages]
//   );

//   const renderContent = () => {
//     if (isLoading) {
//       return Array.from({ length: 6 }, (_, i) => <HomeLoading key={i} />);
//     }
//     if (isError) {
//       return <ErrorShow message="There was an error loading the data" />;
//     }
//     if (!filteredMembers.length) {
//       return <ErrorShow message="No results found" />;
//     }

//     return currentItems.map((member) => (
//       <MemberCard key={member.id} props={member} />
//     ));
//   };

//   return (
//     <>
//       <div className="ak-height-60 ak-height-lg-60"></div>
//       <SearchMember />
//       <div className="ak-height-50 ak-height-lg-30"></div>

//       <div className="container">
//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
//           {renderContent()}
//         </div>
//       </div>

//       {totalPages > 1 && (
//         <>
//           <div className="ak-height-20 ak-height-lg-20"></div>
//           <div className="container">
//             <ul className="pagination justify-content-center">
//               <PaginateButton
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </PaginateButton>

//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (number) => (
//                   <PaginateButton
//                     key={number}
//                     number={number}
//                     onClick={() => handlePageChange(number)}
//                     isActive={currentPage === number}
//                   />
//                 )
//               )}

//               <PaginateButton
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </PaginateButton>
//             </ul>
//           </div>
//         </>
//       )}

//       <div className="ak-height-100 ak-height-lg-60"></div>
//     </>
//   );
// }

// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useGetMembersListQuery } from "../features/member/memberApiIn";
// import { clearSearch } from "../features/member/memberSearchSlice";

// import MemberCard from "../components/MemberCard/MemberCard";
// import SearchMember from "../components/SearchMember/SearchMember";
// import HomeLoading from "../components/UI/HomeLoading";
// import ErrorShow from "../components/UI/ErrorShow";

// const PaginateButton = React.memo(
//   ({ number, onClick, isActive, children, disabled }) => (
//     <li
//       className={`page-item ${isActive ? "active" : ""} ${
//         disabled ? "disabled" : ""
//       }`}
//     >
//       <button
//         onClick={() => onClick(number)}
//         className="page-link"
//         disabled={disabled}
//       >
//         {children || number}
//       </button>
//     </li>
//   )
// );

// export default function Membership() {
//   const dispatch = useDispatch();
//   const [filteredMembers, setFilteredMembers] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 80;

//   const { search: searchTerm } = useSelector((state) => state.memberSearch);
//   const { data: membersData, isLoading, isError } = useGetMembersListQuery();

//   // Reset search when component unmounts
//   useEffect(() => {
//     return () => {
//       dispatch(clearSearch());
//     };
//   }, [dispatch]);

//   // ✅ Normal search logic (Fuse ছাড়া)
//   useEffect(() => {
//     if (!membersData?.result) return;

//     const allMembers = membersData.result;

//     // যদি কোনো সার্চ না থাকে, সব মেম্বার দেখাবে
//     if (!searchTerm || searchTerm.trim() === "") {
//       setFilteredMembers([...allMembers].sort((a, b) => b.id - a.id));
//       return;
//     }

//     const searchLower = searchTerm.toLowerCase();

//     const results = allMembers.filter((member) =>
//       [
//         member.name,
//         member.membership_number,
//         member.organization_name,
//         member.designation_name,
//         member.occupation,
//         member.phone_number,
//         member.hsc_passing_year,
//         member.email,
//         member.session,
//       ]
//         .filter(Boolean) // null বা undefined বাদ দেবে
//         .some((field) => field.toString().toLowerCase().includes(searchLower))
//     );

//     setFilteredMembers([...results].sort((a, b) => b.id - a.id));

//     setCurrentPage(1);

//     // ✅ সার্চের পর পেজ উপরে উঠবে
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [membersData, searchTerm]);

//   // Pagination
//   const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
//   const currentItems = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredMembers.slice(start, start + itemsPerPage);
//   }, [filteredMembers, currentPage]);

//   const handlePageChange = useCallback(
//     (pageNumber) => {
//       if (pageNumber > 0 && pageNumber <= totalPages) {
//         setCurrentPage(pageNumber);
//         window.scrollTo({ top: 0, behavior: "smooth" });
//       }
//     },
//     [totalPages]
//   );

//   const renderContent = () => {
//     if (isLoading) {
//       return Array.from({ length: 6 }, (_, i) => <HomeLoading key={i} />);
//     }
//     if (isError) {
//       return <ErrorShow message="There was an error loading the data" />;
//     }
//     if (!filteredMembers.length) {
//       return <ErrorShow message="No results found" />;
//     }

//     return currentItems.map((member) => (
//       <MemberCard key={member.id} props={member} />
//     ));
//   };

//   return (
//     <>
//       <div className="ak-height-60 ak-height-lg-60"></div>
//       <SearchMember />
//       <div className="ak-height-50 ak-height-lg-30"></div>

//       <div className="container">
//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
//           {renderContent()}
//         </div>
//       </div>

//       {totalPages > 1 && (
//         <>
//           <div className="ak-height-20 ak-height-lg-20"></div>
//           <div className="container">
//             <ul className="pagination justify-content-center">
//               <PaginateButton
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 Previous
//               </PaginateButton>

//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(
//                 (number) => (
//                   <PaginateButton
//                     key={number}
//                     number={number}
//                     onClick={() => handlePageChange(number)}
//                     isActive={currentPage === number}
//                   />
//                 )
//               )}

//               <PaginateButton
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//               </PaginateButton>
//             </ul>
//           </div>
//         </>
//       )}

//       <div className="ak-height-100 ak-height-lg-60"></div>
//     </>
//   );
// }

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import { useGetMembersListQuery } from "../features/member/memberApiIn";
import { clearSearch } from "../features/member/memberSearchSlice";

import MemberCard from "../components/MemberCard/MemberCard";
import SearchMember from "../components/SearchMember/SearchMember";
import HomeLoading from "../components/UI/HomeLoading";
import ErrorShow from "../components/UI/ErrorShow";

const PaginateButton = React.memo(
  ({ number, onClick, isActive, children, disabled }) => (
    <li
      className={`page-item ${isActive ? "active" : ""} ${
        disabled ? "disabled" : ""
      }`}
    >
      <button
        onClick={() => onClick(number)}
        className="page-link"
        disabled={disabled}
      >
        {children || number}
      </button>
    </li>
  )
);

export default function Membership() {
  const dispatch = useDispatch();
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 80;

  const { search: searchTerm } = useSelector((state) => state.memberSearch);
  const { data: membersData, isLoading, isError } = useGetMembersListQuery();

  // clear search when unmount
  useEffect(() => {
    return () => dispatch(clearSearch());
  }, [dispatch]);

  // ✅ Fuse config
  const fuse = useMemo(() => {
    if (!membersData?.result) return null;
    return new Fuse(membersData.result, {
      keys: [
        "name",
        "membership_number",
        "organization_name",
        "phone_number",
        "hsc_passing_year",
        "email",
        "session",
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }, [membersData]);

  // ✅ Search Logic
  useEffect(() => {
    if (!fuse || !membersData?.result) return;

    const allMembers = membersData.result;

    if (!searchTerm.trim()) {
      setFilteredMembers([...allMembers].sort((a, b) => b.id - a.id));
    } else {
      const fuseResults = fuse.search(searchTerm);
      const matchedMembers = fuseResults.map((r) => r.item);

      // ✅ unmatched list (যারা suggestion-এ নেই)
      const unmatched = allMembers.filter(
        (m) => !matchedMembers.some((match) => match.id === m.id)
      );

      // ✅ suggestion (match) গুলোকে উপরে এনে join করা
      const combinedList = [
        ...matchedMembers,
        ...unmatched.sort((a, b) => b.id - a.id),
      ];

      setFilteredMembers(combinedList);
    }

    setCurrentPage(1);
  }, [fuse, searchTerm, membersData]);

  // ✅ Pagination
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const renderContent = () => {
    if (isLoading)
      return Array.from({ length: 6 }, (_, i) => <HomeLoading key={i} />);
    if (isError)
      return <ErrorShow message="There was an error loading the data" />;
    if (!filteredMembers.length)
      return <ErrorShow message="No results found" />;

    return currentItems.map((member) => (
      <MemberCard key={member.id} props={member} />
    ));
  };

  return (
    <>
      <div className="ak-height-60"></div>
      <SearchMember members={membersData?.result || []} />
      <div className="ak-height-50"></div>

      <div className="container">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {renderContent()}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="container mt-4">
          <ul className="pagination justify-content-center">
            <PaginateButton
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </PaginateButton>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <PaginateButton
                  key={number}
                  number={number}
                  onClick={() => handlePageChange(number)}
                  isActive={currentPage === number}
                />
              )
            )}

            <PaginateButton
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </PaginateButton>
          </ul>
        </div>
      )}
    </>
  );
}
