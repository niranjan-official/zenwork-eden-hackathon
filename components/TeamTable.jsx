'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase/config';
import Loading from './Loading';

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        Progress: 50
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        Progress: 90
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        Progress: 70
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        Progress: 40
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        Progress: 60
    },
]

const TeamTable = () => {

    const [teamMembers, setTeamMembers] = useState('');

    useEffect(() => {
        getTeamMembers();
    }, [])

    const getTeamMembers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            const teamMembers = []; // Initialize an empty array

            querySnapshot.forEach((doc) => {
                // Push each document's data to the array
                if (doc.data().position === 'employee') {
                    teamMembers.push({
                        id: doc.id,
                        data: doc.data()
                    });
                }
            });
            console.log(teamMembers);

            setTeamMembers(teamMembers);
        } catch (error) {
            console.error("Error getting team members: ", error);
            return []; // Return an empty array if there's an error
        }
    };


    if (teamMembers) {

        return (
            <Table className="border border-black">
                <TableHeader>
                    <TableRow className="border border-black">
                        <TableHead className="w-[300px] font-semibold">Name</TableHead>
                        <TableHead className="font-semibold">Work Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {teamMembers.map((member, key) => (
                        <TableRow key={key} className="border border-black odd:bg-neutral-200">
                            <TableCell className="font-medium">{member.data.name}</TableCell>
                            <TableCell>{
                                member.data.active ? (
                                    <div className='flex items-center gap-2'>
                                        <div className='size-2 bg-green-500 rounded-full'></div>
                                        AVAILABLE
                                    </div>
                                ) : (
                                    <div className='flex items-center gap-2'>
                                        <div className='size-2 bg-red-500 rounded-full'></div>
                                        ON WORK
                                    </div>
                                )
                            }</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    } else {
        return <Loading />;
    }
}

export default TeamTable