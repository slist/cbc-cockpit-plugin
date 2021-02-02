/* VMware Carbon Black cockpit plugin
 * By Stephane List
 */

const sensor_version = document.getElementById("sensor_version");
const result_sensor_version = document.getElementById("result_sensor_version");

const kernel_version = document.getElementById("kernel_version");
const result_kernel_version = document.getElementById("result_kernel_version");

const header = document.getElementById("header");
const result_header = document.getElementById("result_header");

const cfg = document.getElementById("cfg");
const events_average = document.getElementById("events_average");
const events_detail = document.getElementById("events_detail");
const bpf_event_collector = document.getElementById("bpf_event_collector");
//const bpf_event_collector_E = document.getElementById("bpf_event_collector_E");
//const bpf_event_collector_EW = document.getElementById("bpf_event_collector_EW");

// Common function to append result of the command at the end of the Web page
function cmd_output(data) {
    output.append(document.createTextNode(data));
}

//
// Sensor version check
//
function sensor_version_run() {
	cockpit.spawn(["/opt/carbonblack/psc/bin/cbagentd", "--version"],
		{ err: "out", superuser: "try" })
		.stream(cmd_output)
		.then(sensor_version_success)
		.catch(sensor_version_fail);

	result_sensor_version.innerHTML = "";
	output.innerHTML = "<b>/opt/carbonblack/psc/bin/cbagentd --version</b><hr>";
}

function sensor_version_success() {
    result_sensor_version.style.color = "green";
    result_sensor_version.innerHTML = "success";
}

function sensor_version_fail() {
    result_sensor_version.style.color = "red";
    result_sensor_version.innerHTML = "fail";
}

//
// Kernel version check
// TODO : Check minimum version (4.4+)
//
function kernel_version_run() {
	cockpit.spawn(["uname", "-a"],
		{ err: "out" })
		.stream(cmd_output)
		.then(kernel_version_success)
		.catch(kernel_version_fail);

	result_kernel_version.innerHTML = "";
	output.innerHTML = "<b>uname -a</b><hr>";
}

function kernel_version_success() {
    result_kernel_version.style.color = "green";
    result_kernel_version.innerHTML = "success";
}

function kernel_version_fail() {
    result_kernel_version.style.color = "red";
    result_kernel_version.innerHTML = "fail";
}

//
// Check Kernel header presence
// TODO : Check minimum version (4.4+)

function header_run() {
	cockpit.script(["yum list kernel-devel-$(uname -r)"])
		.stream(cmd_output)
		.then(header_success)
		.catch(header_fail);

	result_header.innerHTML = "";
	output.innerHTML = "<b>yum list kernel-devel-$(uname -r)</b><hr>";
}

function header_success() {
    result_header.style.color = "green";
    result_header.innerHTML = "success";
}

function header_fail() {
    result_header.style.color = "red";
    result_header.innerHTML = "fail";
}

//
// Display files : cfg.ini, ...
// 
function cfg_run() {
	cockpit.spawn(["cat", "/var/opt/carbonblack/psc/cfg.ini"],
		{ err: "out", superuser: "try" })
		.stream(cmd_output);

	output.innerHTML = "<b>cat /var/opt/carbonblack/psc/cfg.ini</b><hr>";
}

function events_average_run() {
	cockpit.spawn(["cat", "/var/opt/carbonblack/psc/log/blades/E51C4A7E-2D41-4F57-99BC-6AA907CA3B40/events-average"],
                { err: "out", superuser: "try" })
                .stream(cmd_output);

        output.innerHTML = "<b>cat /var/opt/carbonblack/psc/log/blades/E51C4A7E-2D41-4F57-99BC-6AA907CA3B40/events-average</b><hr>";
}

function events_detail_run() {
        cockpit.spawn(["cat", "/var/opt/carbonblack/psc/log/blades/E51C4A7E-2D41-4F57-99BC-6AA907CA3B40/events-detail"],
                { err: "out", superuser: "try" })
                .stream(cmd_output);

        output.innerHTML = "<b>cat /var/opt/carbonblack/psc/log/blades/E51C4A7E-2D41-4F57-99BC-6AA907CA3B40/events-detail</b><hr>";
}

function bpf_event_collector_run() {
        cockpit.spawn(["cat", "/var/opt/carbonblack/psc/log/blades/E51C4A7E-2D41-4F57-99BC-6AA907CA3B40/bpf_event_collector.log"],
                { err: "out", superuser: "try" })
                .stream(cmd_output);

        output.innerHTML = "<b>cat /var/opt/carbonblack/psc/log/blades/E51C4A7E-2D41-4F57-99BC-6AA907CA3B40/bpf_event_collector.log</b><hr>";
}

/* Doesn't work :
function bpf_event_collector_E_run() {
        cockpit.script(["grep",  "'\[E\]'" ,"/var/opt/carbonblack/psc/log/blades/E51C4A7E-2D41-4F57-99BC-6AA907CA3B40/bpf_event_collector.log"],
                { err: "out", superuser: "try" })
                .stream(cmd_output);

        output.innerHTML = "<b>grep [E] /var/opt/carbonblack/psc/log/blades/E51C4A7E-2D41-4F57-99BC-6AA907CA3B40/bpf_event_collector.log</b><hr>";
}
*/

sensor_version.addEventListener("click", sensor_version_run);
kernel_version.addEventListener("click", kernel_version_run);
header.addEventListener("click", header_run);

cfg.addEventListener("click", cfg_run);
events_average.addEventListener("click", events_average_run);
events_detail.addEventListener("click", events_detail_run);
bpf_event_collector.addEventListener("click", bpf_event_collector_run);
//bpf_event_collector_E.addEventListener("click", bpf_event_collector_E_run);
//bpf_event_collector_EW.addEventListener("click", bpf_event_collector_EW_run);

