import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import Badge from "../../../components/ui/badge/Badge";
import axios from "axios";
import { useEffect, useState } from "react";

interface partner {
  partner_id: number;
  partner_f_name: string;
  partner_l_name: string;
  partner_mobile: string;
  partner_wallet: string;
  partner_profile_img:  string;
  partner_status: number;
}

export default function BasicTableOne() {
  
  const [partnerData, setPartnerData] = useState<partner[]>([]);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPartnerData = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      const params: any = { page, limit };
      if (search) params.search = search;
      if (statusFilter !== 'all') params.status = statusFilter === 'active' ? 1 : 0;

      const response = await axios.get("http://195.35.22.55:4000/api/partner/get_partners_list", { params, signal });
      console.log("Partner Data:", response.data?.jsonData?.partners);
      setPartnerData(response.data?.jsonData?.partners || []);
      const pag = response.data?.paginations;
      setPage(pag?.page ?? page);
      setLimit(pag?.limit ?? limit);
      setTotalPages(pag?.totalPages ?? 1);
      setTotal(pag?.total ?? (response.data?.jsonData?.partners?.length || 0));
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled');
      } else {
        console.error("Error fetching partner data:", error);
      }
    } finally {
      setLoading(false);
    }
  }

  // debounce requests and abort previous
  useEffect(() => {
    const controller = new AbortController();
    const id = setTimeout(() => fetchPartnerData(controller.signal), 400);
    return () => {
      controller.abort();
      clearTimeout(id);
    };
  }, [page, limit, statusFilter, search]);

  // Helper to show a compact page range with ellipsis
  const getVisiblePages = () => {
    const delta = 2;
    const from = Math.max(1, page - delta);
    const to = Math.min(totalPages, page + delta);
    const pages: (number | string)[] = [];
    if (from > 1) {
      pages.push(1);
      if (from > 2) pages.push('...');
    }
    for (let i = from; i <= to; i++) pages.push(i);
    if (to < totalPages) {
      if (to < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  }


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search by name, mobile or id..."
              className="px-4 py-2 rounded-md border bg-white dark:bg-transparent"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />

            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value as any); setPage(1); }} className="px-3 py-2 rounded-md border bg-white dark:bg-transparent">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <select value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }} className="px-3 py-2 rounded-md border bg-white dark:bg-transparent">
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <span>Showing page {page} of {totalPages}</span>
            <span className="ml-3">Total: {total}</span>
          </div>
        </div>
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                S.No.
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Mobile
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                partner_wallet
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {partnerData.map((partner) => (
              <TableRow key={partner.partner_id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={`https://appdata.medcab.in/${partner.partner_profile_img}`}
                        alt={partner.partner_profile_img}
                      />
                    </div>
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {partner.partner_f_name} {partner.partner_l_name}
                      </span>
                      <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {partner.partner_id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {partner.partner_mobile}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  { partner.partner_wallet}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    color={
                      partner.partner_status === 1
                        ? ("success" as const)
                        : partner.partner_status === 0
                        ? ("warning" as const)
                        : undefined
                    }
                  >
                    {partner.partner_status === 1
                      ? "Active"
                      : partner.partner_status === 0
                      ? "Inactive"
                      : "Unknown"}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {partner.partner_wallet}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Showing { Math.min((page-1)*limit + 1, total || 0) } - { Math.min(page*limit, total || 0) } of {total}
          </div>
          <div className="flex items-center gap-1">
            <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className={`px-3 py-1 rounded ${page === 1 ? 'opacity-50 cursor-not-allowed' : 'bg-white dark:bg-white/[0.06]'}`}>Prev</button>
            {getVisiblePages().map((p, idx) =>
              typeof p === 'string' ? (
                <span key={idx} className="px-2">...</span>
              ) : (
                <button key={p} onClick={() => setPage(Number(p))} className={`px-3 py-1 rounded ${p === page ? 'bg-green-500 text-white' : 'bg-white dark:bg-white/[0.06]'}`}>{p}</button>
              )
            )}
            <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className={`px-3 py-1 rounded ${page === totalPages ? 'opacity-50 cursor-not-allowed' : 'bg-white dark:bg-white/[0.06]'}`}>Next</button>
          </div>
        </div>

        {loading && (
          <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
        )}
      </div>
    </div>
  );
}
