import axios from "axios";
import React, { useState } from "react";
import * as XLSX from "xlsx";

type Props = {
  endpoint: string;
  dataAccess: string;
};

const DatatableActionButton: React.FC<Props> = ({
  endpoint,
  dataAccess,
}) => {
  const baseURL = import.meta.env.VITE_PATH ?? "";
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch data
  const fetchActionData = async (): Promise<any[]> => {
    try {
      setLoading(true);

      const res = await axios.get(`${baseURL}${endpoint}`, {
        params: {
          page: 1,
          limit: 1000, // increase if needed
        },
      });

      const result =
        res.data?.jsonData?.[dataAccess] ?? [];

      return Array.isArray(result) ? result : [];
    } catch (error) {
      console.error("Export error:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // 🔹 COPY
  const handleCopy = async () => {
    const data = await fetchActionData();
    if (!data.length) return;

    try {
      const headers = Object.keys(data[0]);

      const rows = data.map((row: any) =>
        headers.map((h) => row[h] ?? "").join("\t")
      );

      const text = [
        headers.join("\t"),
        ...rows,
      ].join("\n");

      await navigator.clipboard.writeText(text);

      alert("Copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  // 🔹 CSV
  const handleCSV = async () => {
    const data = await fetchActionData();
    if (!data.length) return;

    const headers = Object.keys(data[0]);

    const escapeCSV = (value: any) => {
      if (value == null) return "";
      const str = String(value);
      return `"${str.replace(/"/g, '""')}"`;
    };

    const rows = data.map((row: any) =>
      headers.map((h) => escapeCSV(row[h])).join(",")
    );

    const csvContent = [
      headers.join(","),
      ...rows,
    ].join("\n");

    downloadFile(
      csvContent,
      "export.csv",
      "text/csv;charset=utf-8;"
    );
  };

  // 🔹 EXCEL
  const handleExcel = async () => {
    const data = await fetchActionData();
    if (!data.length) return;

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Data"
    );

    XLSX.writeFile(workbook, "export.xlsx");
  };

  // 🔹 PDF
  const handlePDF = async () => {
    const data = await fetchActionData();
    if (!data.length) return;

    const headers = Object.keys(data[0]);

    const body = [
      headers.map((h) => ({
        text: h,
        bold: true,
      })),

      ...data.map((row: any) =>
        headers.map((h) => row[h] ?? "")
      ),
    ];

    // Dynamic import (Vite-safe)
    const pdfMakeModule = await import(
      "pdfmake/build/pdfmake"
    );

    const pdfFonts = await import(
      "pdfmake/build/vfs_fonts"
    );

    const pdfMake =
      (pdfMakeModule as any).default ||
      pdfMakeModule;

    pdfMake.vfs = (pdfFonts as any).pdfMake.vfs;

    pdfMake
      .createPdf({
        pageOrientation: "landscape",

        content: [
          {
            text: "Exported Data",
            style: "header",
          },
          {
            table: {
              headerRows: 1,
              body,
            },
            layout: "lightHorizontalLines",
          },
        ],

        styles: {
          header: {
            fontSize: 16,
            bold: true,
            marginBottom: 12,
          },
        },
      })
      .download("export.pdf");
  };

  // 🔹 Download helper
  const downloadFile = (
    content: string,
    filename: string,
    type: string
  ) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex">
      <button
        className="px-3 py-1 text-sm font-medium text-gray-700 bg-blue-600 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
        onClick={handleCopy}
      >
        Copy
      </button>

      <button
        className="px-2 py-1 text-sm font-medium text-gray-700 bg-blue-600 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
        onClick={handleExcel}
      >
        Excel
      </button>

      <button
        className="px-3 py-1 text-sm font-medium text-gray-700 bg-blue-600 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
        onClick={handleCSV}
      >
        CSV
      </button>

      <button
        className="px-3 py-2 text-sm font-medium text-gray-700 bg-blue-600 hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
        onClick={handlePDF}
      >
        PDF
      </button>
    </div>
  );
};

export default DatatableActionButton;
