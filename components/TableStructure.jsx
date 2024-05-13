import React from 'react'
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
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        Progress: 30
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        Progress: 50
    },
]

const TableStructure = () => {
    return (
        <Table className="border border-black">
            <TableHeader>
                <TableRow className="border border-black">
                    <TableHead className="w-[300px] font-semibold">Task Name</TableHead>
                    <TableHead className="font-semibold">Assignee</TableHead>
                    <TableHead className="font-semibold text-center">Status</TableHead>
                    <TableHead className="text-right font-semibold">Difficulty</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody >
                {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice} className="border border-black odd:bg-neutral-200">
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.paymentStatus}</TableCell>
                        <TableCell><Progress className="bg-slate-300" value={invoice.Progress} />
                        </TableCell>
                        <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default TableStructure