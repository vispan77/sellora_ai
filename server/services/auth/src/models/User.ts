import mongoose, { Document } from "mongoose";


interface ISocialLinks {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    github?: string;
}

interface IPartnerProfile {
    slug?: string;
    bio?: string;
    website?: string;
    socialLinks?: ISocialLinks;
}

interface IPaymentDetails {
    method: "upi" | "bank";
    upiId?: string;
    accountHolderName: string
    accountNumber?: string;
    ifscCode?: string;
}

export interface IUser extends Document {
    firebaseUid: string,
    name: string,
    email: string,
    role: "partner" | "admin",
    partnerProfile: IPartnerProfile,
    paymentDetails: IPaymentDetails,
    totalSales: number,
    totalRevenue: number,
    isActice: boolean,
    createdAt: Date,
    updatedAt: Date

}

const userSchema = new mongoose.Schema<IUser>({
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: ["partner", "admin"],
        default: "partner",
        index: true
    },
    partnerProfile: {
        slug: {
            type: String,
            unique: true,
            index: true
        },
        bio: {
            type: String,
            default: ""
        },
        website: {
            type: String,
            default: ""
        },
        socialLinks: {
            instagram: {
                type: String,
                default: ""
            },
            youtube: {
                type: String,
                default: ""
            },
            twitter: {
                type: String,
                default: ""
            },
            facebook: {
                type: String,
                default: ""
            },
            linkedin: {
                type: String,
                default: ""
            },
            github: {
                type: String,
                default: ""
            }
        }
    },
    paymentDetails: {
        method: {
            type: String,
            enum: ["upi", "bank"],
            default: "upi"
        },
        upiId: {
            type: String,
            default: ""
        },
        accountHolderName: {
            type: String,
            default: ""
        },
        accountNumber: {
            type: String,
            default: ""
        },
        ifscCode: {
            type: String,
            default: ""
        }
    },
    totalSales: {
        type: Number,
        default: 0,
        min: 0
    },
    totalRevenue: {
        type: Number,
        default: 0,
        min: 0
    },
    isActice: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User