import { AdminTopNav } from "@/src/components/section/admin/topNav";
import { articles } from "./articles";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function Articles() {
	return <DataTable columns={columns} data={articles} />;
}
