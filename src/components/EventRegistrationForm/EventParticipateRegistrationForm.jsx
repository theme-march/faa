import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {
    useAddEventRegisterMutation,
    useGetEventDetailsIdQuery,
} from "../../features/events/eventsApiInject";
import {
    useGetMemberDetailsIdQuery,
} from "../../features/member/memberApiIn";

import ErrorShow from "../UI/ErrorShow";
import HomeLoading from "../UI/HomeLoading";

export default function EventParticipateRegistrationForm({ props: eventId }) {
    const loginUser = JSON.parse(localStorage.getItem("user"));

    // API Queries and Mutations
    const { data: memberData, isLoading: memberLoading } = useGetMemberDetailsIdQuery(loginUser?.id, { skip: !loginUser });
    const { data: eventDetails, isLoading: eventLoading } = useGetEventDetailsIdQuery(eventId, { skip: !eventId });
    const [addEventRegister] = useAddEventRegisterMutation();

    // Form configuration
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm();

    // State for breakdown
    const [participationType, setParticipationType] = useState(""); // Single or Spouse
    const [tshirtSize, setTShirtSize] = useState(null);
    const [deliveryOption, setDeliveryOption] = useState('from_event');
    const [deliveryCharge, setDeliveryCharge] = useState(0);
    const [membershipRenewAmount, setMembershipRenewAmount] = useState(0); // Member Renew Amount
    const [totalAmount, setTotalAmount] = useState(0);

    // Toast options
    const toastOptions = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
    };

    // Batches / Sections options
    const batchOptions = [
          // HNS Batches
    { value: "HNS - 01", label: "HNS - 01: 1969 (1st Batch)" },
    { value: "HNS - 02", label: "HNS - 02: 1970-71 (2nd Batch)" },
    { value: "HNS - 03", label: "HNS - 03: 1972 (3rd Batch)" },
    { value: "HNS - 04", label: "HNS - 04: 1973 (4th Batch)" },
    { value: "HNS - 05", label: "HNS - 05: 1974 (5th Batch)" },
    { value: "HNS - 06", label: "HNS - 06: 1975 (6th Batch)" },
    { value: "HNS - 07", label: "HNS - 07: 1976-77 (7th Batch)" },
    { value: "HNS - 08", label: "HNS - 08: 1978 (8th Batch)" },
    { value: "HNS - 09", label: "HNS - 09: 1979 (9th Batch)" },
    { value: "HNS - 10", label: "HNS - 10: 1980 (10th Batch)" },
    { value: "HNS - 11", label: "HNS - 11: 1981 (11th Batch)" },
    { value: "HNS - 12", label: "HNS - 12: 1982 (12th Batch)" },
    { value: "HNS - 13", label: "HNS - 13: 1983 (13th Batch)" },
    { value: "HNS - 14", label: "HNS - 14: 1984 (14th Batch)" },
    { value: "HNS - 15", label: "HNS - 15: 1985 (15th Batch)" },
    { value: "HNS - 16", label: "HNS - 16: 1986 (16th Batch)" },
    { value: "HNS - 17", label: "HNS - 17: 1987 (17th Batch)" },
    { value: "HNS - 18", label: "HNS - 18: 1988 (18th Batch)" },
    { value: "HNS - 19", label: "HNS - 19: 1989 (19th Batch)" },
    { value: "HNS - 20", label: "HNS - 20: 1990 (20th Batch)" },
    { value: "HNS - 21", label: "HNS - 21: 1991 (21st Batch)" },
    { value: "HNS - 22", label: "HNS - 22: 1992 (22nd Batch)" },
    { value: "HNS - 23", label: "HNS - 23: 1993 (23rd Batch)" },

    // BBA Batches
    { value: "BBA - 01", label: "BBA - 01: 1994 (24th Batch)" },
    { value: "BBA - 02", label: "BBA - 02: 1995 (25th Batch)" },
    { value: "BBA - 03", label: "BBA - 03: 1996 (26th Batch)" },
    { value: "BBA - 04", label: "BBA - 04: 1997 (27th Batch)" },
    { value: "BBA - 05", label: "BBA - 05: 1998 (28th Batch)" },
    { value: "BBA - 06", label: "BBA - 06: 1999 (29th Batch)" },
    { value: "BBA - 07", label: "BBA - 07: 2000 (30th Batch)" },
    { value: "BBA - 08", label: "BBA - 08: 2001 (31st Batch)" },
    { value: "BBA - 09", label: "BBA - 09: 2002 (32nd Batch)" },
    { value: "BBA - 10", label: "BBA - 10: 2003 (33rd Batch)" },
    { value: "BBA - 11", label: "BBA - 11: 2004 (34th Batch)" },
    { value: "BBA - 12", label: "BBA - 12: 2005 (35th Batch)" },
    { value: "BBA - 13", label: "BBA - 13: 2006 (36th Batch)" },
    { value: "BBA - 14", label: "BBA - 14: 2007 (37th Batch)" },
    { value: "BBA - 15", label: "BBA - 15: 2008 (38th Batch)" },
    { value: "BBA - 16", label: "BBA - 16: 2009 (39th Batch)" },
    { value: "BBA - 17", label: "BBA - 17: 2010 (40th Batch)" },
    { value: "BBA - 18", label: "BBA - 18: 2011 (41st Batch)" },
    { value: "BBA - 19", label: "BBA - 19: 2012 (42nd Batch)" },
    { value: "BBA - 20", label: "BBA - 20: 2013 (43rd Batch)" },
    { value: "BBA - 21", label: "BBA - 21: 2014 (44th Batch)" },
    { value: "BBA - 22", label: "BBA - 22: 2015 (45th Batch)" },
    { value: "BBA - 23", label: "BBA - 23: 2016 (46th Batch)" },
    { value: "BBA - 24", label: "BBA - 24: 2017 (47th Batch)" },
    { value: "BBA - 25", label: "BBA - 25: 2018 (48th Batch)" },
    { value: "BBA - 26", label: "BBA - 26: 2019 (49th Batch)" },
    { value: "BBA - 27", label: "BBA - 27: 2020 (50th Batch)" },
    { value: "BBA - 28", label: "BBA - 28: 2021 (51st Batch)" },
    { value: "BBA - 29", label: "BBA - 29: 2022 (52nd Batch)" },
    { value: "BBA - 30", label: "BBA - 30: 2023 (53rd Batch)" },
    { value: "BBA - 31", label: "BBA - 31: 2024 (54th Batch)" },
        
        // EMB Batches
        { value: "EMB - 01", label: "EMB - 01: 2002" },
        { value: "EMB - 02", label: "EMB - 02: 2003" },
        { value: "EMB - 03", label: "EMB - 03: 2004" },
        { value: "EMB - 04", label: "EMB - 04: 2005" },
        { value: "EMB - 05", label: "EMB - 05: 2006" },
        { value: "EMB - 06", label: "EMB - 06: 2007" },
        { value: "EMB - 07", label: "EMB - 07: 2008" },
        { value: "EMB - 08", label: "EMB - 08: 2009" },
        { value: "EMB - 09", label: "EMB - 09: 2010" },
        { value: "EMB - 10", label: "EMB - 10: 2011" },
        { value: "EMB - 11", label: "EMB - 11: 2012" },
        { value: "EMB - 12", label: "EMB - 12: 2013" },
        { value: "EMB - 13", label: "EMB - 13: 2014" },
        { value: "EMB - 14", label: "EMB - 14: 2015" },
        { value: "EMB - 15", label: "EMB - 15: 2016" },
        { value: "EMB - 16", label: "EMB - 16: 2017" },
        { value: "EMB - 17", label: "EMB - 17: 2018" },
        { value: "EMB - 18", label: "EMB - 18: 2019" },
        { value: "EMB - 19", label: "EMB - 19: 2020" },
        { value: "EMB - 20", label: "EMB - 20: 2021" },
        { value: "EMB - 21", label: "EMB - 21: 2022" },
        { value: "EMB - 22", label: "EMB - 22: 2023" },
        { value: "EMB - 23", label: "EMB - 23: 2024" },

        // MPF Batches
        { value: "MPF - 01", label: "MPF - 01: 2015" },
        { value: "MPF - 02", label: "MPF - 02: 2016" },
        { value: "MPF - 03", label: "MPF - 03: 2017" },
        { value: "MPF - 04", label: "MPF - 04: 2018" },
        { value: "MPF - 05", label: "MPF - 05: 2019" },
        { value: "MPF - 06", label: "MPF - 06: 2020" },
        { value: "MPF - 07", label: "MPF - 07: 2021" },
        { value: "MPF - 08", label: "MPF - 08: 2022" },
        { value: "MPF - 09", label: "MPF - 09: 2023" },
        { value: "MPF - 10", label: "MPF - 10: 2024" },
    ];

    const options = batchOptions.map((batch) => ({
        value: batch.value, // Use Batch ID for the value
        label: `${batch.label}`, // Combine Batch ID and HSC Passing Year for the label
    }));
    

    // Update breakdown based on member data
    useEffect(() => {
        if (memberData?.success && eventDetails?.success) {
            const member = memberData.result;
            setValue("event_id", eventId);
            setValue("member_id", member.id);
            setValue("session", member.session);
            setValue("full_name", member.name);
            setValue("organization_name", member.organization_name);
            setValue("designation_name", member.designation_name);
            setValue("email_address", member.email);
            setValue("phone_number", member.phone_number);
            setValue("pay_amount", eventDetails?.result[0]?.event_fees);

            // Set Member Renew Amount
            if (member.membership_category_id === "3") {
                setMembershipRenewAmount(0);
            } else if (member.membership_category_id === "4") {
                setMembershipRenewAmount(Number(eventDetails?.result[0]?.membership_renew_fees));
            }
        } else {
            // Fallback values when memberData is undefined
            reset({
                event_id: eventId,
                member_id: "",
                student_id: "",
                session: "",
                full_name: "",
                organization_name: "",
                designation_name: "",
                email_address: "",
                phone_number: "",
                pay_amount: eventDetails?.result[0]?.event_fees,
            });
            setMembershipRenewAmount(0); // Default for undefined member data
        }
    }, [memberData, eventDetails, setValue, reset, loginUser, eventId]);

    const handleTShirtSizeChange = (value) => {
        setTShirtSize(value);
    };

    // Helper function for calculation
    const calculateTotalAmount = (participationType, membershipRenewAmount, memberData, deliveryCharge = 0) => {
        let participationAmount = 0;

        if (memberData) {
            if (participationType === "Single") {
                participationAmount = Number(eventDetails?.result[0]?.member_single_fees);
            } else if (participationType === "Spouse") {
                participationAmount = Number(Number(eventDetails?.result[0]?.member_single_fees) + Number(eventDetails?.result[0]?.member_spouse_fees));
            }
        } else {
            if (participationType === "Single") {
                participationAmount = Number(eventDetails?.result[0]?.student_single_fees);
            } else if (participationType === "Spouse") {
                participationAmount = Number(Number(eventDetails?.result[0]?.student_single_fees) + Number(eventDetails?.result[0]?.student_spouse_fees));
            }
        }

        return membershipRenewAmount + participationAmount + deliveryCharge;
    };

    const handleReset = () => {
        reset({
            t_shirt_size: "",       // Reset T-Shirt size
            delivery_address: "",   // Reset Delivery Address
            delivery_charge: "",    // Reset Delivery Charge
            delivery_option: "",    // Reset Delivery Option
        });

        // Reset additional states if needed
        setTShirtSize(null)
        setDeliveryOption("from_event")
        setDeliveryCharge(0);
        setTotalAmount(0);
    };

    // Event Handlers
    const handleParticipationChange = (value) => {
        if(!value){
            handleReset();
            setParticipationType(value);
        }else{
            setParticipationType(value);

            // Recalculate total with the updated participation type and existing delivery charge
            const total = calculateTotalAmount(value, membershipRenewAmount, memberData, deliveryCharge);
            setTotalAmount(total);
        }
    };

    const handleDeliveryOptionChange = (value) => {
        if(!value || value === "from_event"){
            reset({
                delivery_charge: "",    // Reset Delivery Charge
            });
        }
        setDeliveryOption(value);

        // Reset delivery charge to ensure consistency
        setDeliveryCharge(0);

        // Recalculate total amount without delivery charge
        const total = calculateTotalAmount(participationType, membershipRenewAmount, memberData, 0);
        setTotalAmount(total);
    };

    const handleDeliveryChargeChange = (value) => {
        const charge = Number(value);
        setDeliveryCharge(charge);

        // Recalculate total with the updated delivery charge
        const total = calculateTotalAmount(participationType, membershipRenewAmount, memberData, charge);
        setTotalAmount(total);
    };

    const onSubmit = async (data) => {
        
        try {
            data.event_id = eventDetails?.result[0]?.id;
            if (memberData?.success) {
                const member = memberData.result;
                data.session = member.session;
                if (participationType === "Single") {
                    data.member_single_fees = eventDetails?.result[0]?.member_single_fees;
                } else if (participationType === "Spouse") {
                    data.member_single_fees = eventDetails?.result[0]?.member_single_fees;
                    data.member_spouse_fees = eventDetails?.result[0]?.member_spouse_fees;
                }
                if (member.membership_category_id === "3") {
                    data.member_type = "Life Time Member";
                    data.member_category_id = member.membership_category_id;
                } else if (member.membership_category_id === "4") {
                    data.membership_renew_fees = eventDetails?.result[0]?.membership_renew_fees;
                    data.member_type = "General Member";
                    data.member_category_id = member.membership_category_id;
                }else{
                    data.member_type = "Student/Guest";
                    data.member_category_id = "6";
                }
            } else {
                if (participationType === "Single") {
                    data.student_single_fees = eventDetails?.result[0]?.student_single_fees;
                } else if (participationType === "Spouse") {
                    data.student_single_fees = eventDetails?.result[0]?.student_single_fees;
                    data.student_spouse_fees = eventDetails?.result[0]?.student_spouse_fees;
                }
                data.member_type = "Student/Guest";
                data.member_category_id = "6";
            }

            data.pay_amount = totalAmount;
            const registerResponse = await addEventRegister(data);

            if (registerResponse?.data?.success || registerResponse?.data?.message === "Already event registered!") {
                window.location.replace(registerResponse.data.url);
            } else {
                toast.info(registerResponse?.data?.message, toastOptions);
            }
        } catch (error) {
            toast.error(error.message, toastOptions);
        }
    };

    if (memberLoading || eventLoading) return <HomeLoading />;
    if (!eventDetails?.success) return <ErrorShow message="No event details found" />;

    const formatAmount = (amount) => {
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    return (
        <div className="container">
            <div className="ak-height-80 ak-height-lg-60"></div>
            <h6 className="mb-3">Event Title: {eventDetails?.result[0]?.event_title}</h6>
            <form onSubmit={handleSubmit(onSubmit)} className="row g-3" autoComplete="on">
                {/* Input Fields */}
                {
                    !memberData ?
                    <>
                        <InputField
                            label="Student ID/Guest ID"
                            id="inputName"
                            required
                            register={register}
                            field="student_id"
                            validation={{required: true}}
                            errorMessage={{
                                required: "Student ID is required",
                            }}
                            error={errors.student_id}
                        />
                        {/* <InputField
                            label="Batch number/ Session"
                            id="inputName"
                            required
                            register={register}
                            field="session"
                            validation={{required: true}}
                            errorMessage={{
                                required: "Batch number/ Session is required",
                            }}
                            error={errors.session}
                        /> */}
                        <InputField
                            label = "Batch number/ Session"
                            id = "inputName"
                            required
                            register = {register}
                            field = "session"
                            type = "select"
                            validation = {{required: true}}
                            options = {options}
                            errorMessage = {{
                                required: "Batch number/ Session is required",
                            }}
                            error = {errors.session}
                        />
                    </>
                    :null
                }
                <InputField
                    label="Name"
                    id="inputName"
                    required
                    register = {register}
                    field = "full_name"
                    validation={{required: true, minLength: 3, maxLength: 50}}
                    errorMessage={{
                        required: "Name is required",
                        minLength: "Name must be at least 3 characters",
                        maxLength: "Name cannot exceed 50 characters",
                    }}
                    error={errors.full_name}
                />

                <InputField
                    label="Organization Name"
                    id="inputOrganization"
                    required
                    register={register}
                    field="organization_name"
                    validation={{required: true, minLength: 3, maxLength: 100}}
                    errorMessage={{
                        required: "Organization Name is required",
                        minLength: "Organization Name must be at least 3 characters",
                        maxLength: "Organization Name cannot exceed 100 characters",
                    }}
                    error={errors.organization_name}
                />

                <InputField
                    label="Email Address"
                    id="inputEmail"
                    type="email"
                    required
                    register={register}
                    field="email_address"
                    validation={{
                        required: true,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                        },
                    }}
                    errorMessage={{
                        required: "Email is required",
                        pattern: "Invalid email format",
                    }}
                    error={errors.email_address}
                />

                <InputField
                    label="Phone Number"
                    id="inputPhone"
                    type="tel"
                    required
                    register={register}
                    field="phone_number"
                    validation={{
                        required: true,
                        minLength: {value: 10, message: "Phone number must be at least 10 digits"},
                        maxLength: {value: 15, message: "Phone number cannot exceed 15 digits"},
                    }}
                    errorMessage={{required: "Phone number is required"}}
                    error={errors.phone_number}
                />

                {
                    memberData ?
                        <InputField
                            label="Participation Type"
                            id="participationType"
                            type="select"
                            register={register}
                            field="participation_type"
                            validation={{required: true}}
                            options={[
                                {value: "Single", label: `Single (${eventDetails?.result[0]?.member_single_fees} Taka)`},
                                {value: "Spouse", label: `Spouse (Single ${eventDetails?.result[0]?.member_single_fees} + Spouse ${eventDetails?.result[0]?.member_spouse_fees} Taka)`},
                            ]}
                            onChange={(e) => handleParticipationChange(e.target.value)}
                            errorMessage={{required: "Please select a participation type"}}
                            error={errors.participation_type}
                        />
                    :
                        <InputField
                            label="Participation Type"
                            id="participationType"
                            type="select"
                            register={register}
                            field="participation_type"
                            validation={{required: true}}
                            options={[
                                {value: "Single", label: `Single (${eventDetails?.result[0]?.student_single_fees} Taka)`},
                                {value: "Spouse", label: `Spouse (Single ${eventDetails?.result[0]?.student_single_fees} + Spouse ${eventDetails?.result[0]?.student_spouse_fees} Taka)`}
                            ]}
                            onChange={(e) => handleParticipationChange(e.target.value)}
                            errorMessage={{required: "Please select a participation type"}}
                            error={errors.participation_type}
                        />
                }

                {/* Gift details */}
                {
                    participationType ?
                        <>
                            <InputField
                                label="T-Shirt Size"
                                id="tShirtSize"
                                type="select"
                                register={register}
                                field="t_shirt_size"
                                validation={{required: true}}
                                options={[
                                    {value: "S", label: "T- Shirt: S - Body Length 68\" chest 49\"."},
                                    {value: "M", label: "T- Shirt: M - Body Length 70\" chest 51\"."},
                                    {value: "L", label: "T- Shirt: L - Body Length 72\" chest: 53\"."},
                                    {value: "XL", label: "T- Shirt: XL - Body Length 74\" chest 56\""},
                                    {value: "XXL", label: "T- Shirt: XXL - Body Length 76\" chest 59\""},
                                ]}
                                onChange={(e) => handleTShirtSizeChange(e.target.value)}
                                errorMessage={{required: "Please select a T-Shirt size"}}
                                error={errors.t_shirt_size}
                            />
                            {
                                tshirtSize ?
                                    <>
                                        <InputField
                                            label="Do you want to receive your gift at home?"
                                            id="deliveryOption"
                                            type="select"
                                            register={register}
                                            field="delivery_option"
                                            validation={{required: true}}
                                            options={[
                                                {value: "from_event", label: "No"},
                                                {value: "from_home", label: "Yes"},
                                            ]}
                                            errorMessage={{required: "Please select delivery option"}}
                                            onChange={(e) => handleDeliveryOptionChange(e.target.value)}
                                            error={errors.delivery_option}
                                        />
                                        {
                                            deliveryOption === "from_home" ?
                                                <>
                                                    {/*<InputField*/}
                                                    {/*    label="Delivery Charge"*/}
                                                    {/*    id="deliveryCharge"*/}
                                                    {/*    type="select"*/}
                                                    {/*    register={register}*/}
                                                    {/*    field="delivery_charge"*/}
                                                    {/*    validation={{required: true}}*/}
                                                    {/*    options={[*/}
                                                    {/*        {value: "60", label: "For Dhaka (60 TK)"},*/}
                                                    {/*        {value: "110", label: "Outside Dhaka (110 TK)"},*/}
                                                    {/*    ]}*/}
                                                    {/*    onChange={(e) => handleDeliveryChargeChange(e.target.value)}*/}
                                                    {/*    errorMessage={{required: "Please select a delivery charge"}}*/}
                                                    {/*    error={errors.delivery_charge}*/}
                                                    {/*/>*/}
                                                    <div style={{fontSize: 12}}>
                                                        <div style={{fontWeight:'bold'}}>Delivery Address</div>
                                                        <div>1. Pay Delivery Charge in cash on delivery: Dhaka - 60 TK</div>
                                                        <div>2. Pay Delivery Charge in cash on delivery: Outside Dhaka - 110 TK</div>
                                                    </div>
                                                    <InputField
                                                        label="Delivery Address"
                                                        id="deliveryAddress"
                                                        required
                                                        register={register}
                                                        field="delivery_address"
                                                        validation={{required: true}}
                                                        errorMessage={{
                                                            required: "Delivery address is required",
                                                        }}
                                                        error={errors.delivery_address}
                                                    />
                                                    <div style={{color: '#a55252'}}>Please note you can't edit the address after pay</div>
                                                </>
                                                :null
                                        }
                                    </>
                                    :null
                            }
                        </>
                        :null
                }

                {/* Membership Amount Breakdown */}
                <div className="col-12 mt-4">
                    <h5 className="text-primary">Payment Details</h5>
                    <div className="amount-breakdown p-3 border rounded bg-light">
                        {
                            memberData ?
                                <p className="d-flex justify-content-between">
                                    <span><strong>Annual Membership:</strong></span>
                                    <span>{membershipRenewAmount.toFixed(2)} Taka</span>
                                </p>
                            :null
                        }

                        {participationType === "Single" && memberData &&(
                            <p className="d-flex justify-content-between">
                                <span><strong>Subscription fee:</strong></span>
                                <span>+ {eventDetails?.result[0]?.member_single_fees} Taka</span>
                            </p>
                        )}
                        {participationType === "Single" && !memberData && (
                            <p className="d-flex justify-content-between">
                                <span><strong>Student Subscription fee:</strong></span>
                                <span>+ {eventDetails?.result[0]?.student_single_fees} Taka</span>
                            </p>
                        )}
                        {participationType === "Spouse" && memberData &&(
                            <>
                                <p className="d-flex justify-content-between">
                                    <span><strong>Subscription fee:</strong></span>
                                    <span>+ {eventDetails?.result[0]?.member_single_fees} Taka</span>
                                </p>
                                <p className="d-flex justify-content-between">
                                    <span><strong>With Spouse:</strong></span>
                                    <span>+ {eventDetails?.result[0]?.member_spouse_fees} Taka</span>
                                </p>
                            </>
                        )}
                        {participationType === "Spouse" && !memberData && (
                            <>
                                <p className="d-flex justify-content-between">
                                    <span><strong>Student Subscription fee:</strong></span>
                                    <span>+ {eventDetails?.result[0]?.student_single_fees} Taka</span>
                                </p>
                                <p className="d-flex justify-content-between">
                                    <span><strong>With Spouse:</strong></span>
                                    <span>+ {eventDetails?.result[0]?.student_spouse_fees} Taka</span>
                                </p>
                            </>
                        )}

                        {deliveryCharge > 0 && (
                            <p className="d-flex justify-content-between">
                                <span><strong>Delivery Charge:</strong></span>
                                <span>+ {deliveryCharge.toFixed(2)} Taka</span>
                            </p>
                        )}

                        <hr/>
                        <p className="d-flex justify-content-between text-success fw-bold">
                            <span>Total:</span>
                            <span>{formatAmount(totalAmount)} Taka</span>
                        </p>
                    </div>
                </div>

                <TermsAndConditions/>

                {/* Submit Button */}
                <div className="col-12 mt-4">
                    <button type="submit" className="button-primary">Pay Now</button>
                </div>
            </form>
        </div>
    );
}

// InputField Component
function InputField({label, id, type = "text", register, field, validation, error, errorMessage, options, onChange}) {
    return (
        <div className="col-md-6">
            <label htmlFor={id} className="form-label">{label}*</label>
            {type === "select" ? (
                <select
                    className="text-input-filed type_2"
                    id={id}
                    {...register(field, validation)}
                    onChange={onChange}
                >
                    <option value="">Select...</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    className="text-input-filed type_2"
                    id={id}
                    {...register(field, validation)}
                />
            )}
            {error && <p className="text-danger">{errorMessage[error.type]}</p>}
        </div>
    );
}

// Terms and Conditions Component
function TermsAndConditions() {
    return (
        <div className="col-12">
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsConditions"
                    required
                />
                <label className="form-check-label" htmlFor="termsConditions">
                    I agree to the terms and conditions.
                </label>
            </div>
        </div>
    );
}
