import * as Yup from "yup";

export interface RegisterI {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    userGrpId: string;
}

export interface LoginI {
    email: string;
    password: string;
}

export interface SendOtpI {
    email: string;
}

export interface verifyOtpI {
    otp: string;
}

export interface StdDetailI {
    gender: string;
    birthDate: string;
    stream: string;
    address: {
        address: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
    }
    preference: {
        profession: string;
        courseType: string;
        jobPlacement: string;
        scholarship: string;
        nearbyUniversity: string;
        transportation: string;
        accommodation: string;
        minFee: number;
        maxFee: number;
    }
}

export interface EnrollCourseI {
    optionalSubjectID: string[]
}
export interface StreamI {
    name: string
}

export interface SubjectI {
    name: string,
    fullname: string
}

export interface CourseI {
    name: string,
    fullname: string,
    courseType: '' | "FullTime" | "PartTime" | "E Learning",
    subjects: {
        compulsory: string[],
        optional: string[]
    }
}
export interface CourseDetail {
    courseId: string;
    fee: number;
    capacity: number;
}
export interface UniversityI {
    name: string;
    jobPlacement: string;
    scholarship: string;
    nearbyUniversity: string;
    transportation: string;
    accommodation: string;
    address: {
        address: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
    };
    stream: string[];
    course: string[];
    courseDetails: CourseDetail[];
};


export const RegisterInitialValues: RegisterI = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userGrpId: '682c19922bb32dfa02ed0eab',
};


export const LoginInitialValues: LoginI = {
    email: '',
    password: '',
};

export const SendOtpInitialValues: SendOtpI = {
    email: "",
}

export const verifyOtpInitialValues: verifyOtpI = {
    otp: ''
}


export const StdDetailInitialValues: StdDetailI = {
    gender: '',
    birthDate: '',
    stream: '',
    address: {
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: 0,
    },
    preference: {
        profession: '',
        courseType: '',
        jobPlacement: '',
        scholarship: '',
        nearbyUniversity: '',
        transportation: '',
        accommodation: '',
        minFee: 3000,
        maxFee: 3000,
    }
};

export const EnrollCourseinitialValues: EnrollCourseI = {
    optionalSubjectID: [],
};
export const StreamInitialValues: StreamI = {
    name: "",
}

export const SubjectInitialValues: SubjectI = {
    name: "",
    fullname: ""
}

export const CourseInitialValues: CourseI = {
    name: '',
    fullname: '',
    courseType: '',
    subjects: {
        compulsory: [],
        optional: []
    }
}

export const UniversityInitialValues: UniversityI = {
    name: '',
    jobPlacement: '',
    scholarship: '',
    nearbyUniversity: '',
    transportation: '',
    accommodation: '',
    address: {
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: 0,
    },
    stream: [],
    course: [],
    courseDetails: []
};


const email = Yup.string().email('Invalid email').required('Email is required');
const name = Yup.string().min(2, 'Too Short!').required('Name is required');
const fullname = Yup.string().min(4, 'Too Short!').required('Full Name is required');
const booleanItem = Yup.boolean().required();
const password = Yup.string().matches(/^[a-zA-Z0-9]+$/, "Password must be Alphanumeric")
    .min(6, 'Password must be at least 6 characters')
    .max(15, 'Password must be at most 15 characters')
    .required('Password is required');

const objectIdPattern = /^[a-fA-F0-9]{24}$/;

const pincode = Yup.string()
    .matches(/^\d{6}$/, 'Pincode must be 6 digits')
    .required('Pincode is required')



export const RegisterSchema = Yup.object().shape({
    name: name,
    username: Yup.string()
        .matches(/^(?=.*\d)(?=.*[!@.&*_])[a-zA-Z0-9!@.&*_]{3,30}$/, "Must have one Digit & One Special Character(!,@,.,&,_,*)")
        .min(3, 'Too Short!').required('User Name is required'),
    email: email,
    password: password,
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
    userGrpId: Yup.string().matches(objectIdPattern, "Invalid User").required("User Group is required"),

});


export const LoginSchema = Yup.object().shape({
    email: email,
    password: password
});

export const sendOptSchema = Yup.object().shape({
    email: email,
})

export const verifyOtpSchema = Yup.object().shape({
    otp: Yup.string().matches(/^\d{6}$/, 'OTP must be a 6-digit number').required("OTP is required")
})


export const StdSchema = Yup.object().shape({
    gender: Yup.string()
        .oneOf(['Male', 'Female', 'Others'], 'Select a valid gender')
        .required('Gender is required'),

    birthDate: Yup.date()
        .max(new Date('2005-12-31'), 'You must be born before 2006')
        .required('Birth date is required'),

    stream: Yup.string().matches(objectIdPattern, 'Invalid stream ID')
        .required('Stream is required'),

    address: Yup.object().shape({
        address: Yup.string()
            .min(5, 'Address must be at least 5 characters')
            .required('Address is required'),

        city: Yup.string()
            .min(2, 'City must be at least 2 characters')
            .required('City is required'),

        state: Yup.string()
            .min(2, 'State must be at least 2 characters')
            .required('State is required'),

        country: Yup.string()
            .min(2, 'Country must be at least 2 characters')
            .required('Country is required'),

        pincode: pincode
    }).required('Address is Required'),

    preference: Yup.object().shape({
        profession: Yup.string()
            .required('Profession is required'),

        courseType: Yup.string()
            .oneOf(['FullTime', 'PartTime', 'ELearning'], 'Select a valid course type')
            .required('Course type is required'),

        jobPlacement: Yup.boolean()
            .required('Job placement preference is required'),

        scholarship: Yup.boolean()
            .required('Scholarship preference is required'),

        nearbyUniversity: Yup.boolean()
            .required('Nearby university preference is required'),

        transportation: Yup.boolean()
            .required('Transportation preference is required'),

        accommodation: Yup.boolean()
            // .oneOf(['true', 'false'], 'Select accommodation preference')
            .required('Accommodation preference is required'),

        minFee: Yup.number()
            .min(3000, 'Minimum fee must be at least ₹3000')
            .required('Minimum fee is required'),

        maxFee: Yup.number()
            .moreThan(Yup.ref('minFee'), 'Maximum fee must be greater than minimum fee')
            .required('Maximum fee is required'),
    }).required('Preferences are required'),
});

export const streamSchema = Yup.object().shape({
    name: name,
})

export const FeeCapSchema = Yup.object().shape({
    fee: Yup.number().min(3000, 'Minimum ₹3000 Fee Required ').required('Fee is Required'),
    capacity: Yup.number().min(10, 'Minimum 10 Student Capacity is Required').max(100).required('Capacity is Required'),
    courseId: Yup.string().required('Course Required')
})

export const subjectSchema = Yup.object().shape({
    name: name,
    fullname: fullname
})

export const EnrollCourseSchema = Yup.object({
    optionalSubjectID: Yup.array()
        .of(Yup.string())
        .min(1, "Please select at least one optional subject."),
});


export const CourseSchema = Yup.object().shape({
    name: name,
    fullname: fullname,
    courseType: Yup.string().oneOf(['FullTime', 'PartTime', 'E Learning'], 'Select a valid course type').required("Course Type is required"),
    subjects: Yup.object().shape({
        compulsory: Yup.array()
            .of(Yup.string())
            .min(3, "At least 3 compulsory subject is required"),
        optional: Yup.array()
            .of(Yup.string())
            .min(2, "At least 2 optional subject is required")
    })
})


export const UniversitySchema = Yup.object().shape({
    name: name,
    jobPlacement: booleanItem,
    scholarship: booleanItem,
    nearbyUniversity: booleanItem,
    transportation: booleanItem,
    accommodation: booleanItem,
    address: Yup.object().shape({
        address: name,
        city: name,
        state: name,
        country: name,
        pincode: pincode
    }).required('Address is required'),
    stream: Yup.array()
        .of(Yup.string())
        .min(1, 'At least One stream is required'),
    course: Yup.array()
        .of(Yup.string())
        .min(1, "At least One course is required"),
    courseDetails: Yup.array()
        .of(
            Yup.object().shape({
                courseId: Yup.string().required("Course is required"),
                fee: Yup.number()
                    .required("Fee is required")
                    .min(3000, "Minimum ₹3000 Fee Required"),
                capacity: Yup.number()
                    .required("Capacity is required")
                    .min(10, "Minimum 10 students")
                    .max(100, "Maximum 100 students"),
            })
        )
        .min(1, "At least one course detail required"),
})