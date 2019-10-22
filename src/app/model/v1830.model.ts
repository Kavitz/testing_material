export class V1830 {
}

export interface Vcenter {
    name: string;
    ipaddress: string;
    username: string;
    password: string;
}

export interface Ovf {
    name: string;
    product: string;
    version: string;
    url: string;
}

export interface SelectOpion {
	value: string;
	viewValue: string;
}

export interface ManageUsers {
    username: string;
    role: string;
    password: string;
    groupname: string;
}

export interface ManageGroups {
    groupname: string;
    creayed_by: string;

}

export interface Resource {
    name: string;
    mqttserver: string;
    diskmode: string;
    localinstall: boolean;
    vcenter: any;
    ovftemplate: any;
    datastore: string;
    datacenter: string;
    cluster: string;
    network: string;
    netgmre: string;
    netoamp: string;
    nete1: string;
    nete2: string;
    nete3: string;
    netvoip: string;
    netilan: string;
    netcit: string;
    netauxa: string;
    netauxb: string;
    nocores: number;
    ramsize: number;
    ramunit: string;
    mainshelf: string;
    shelfmode: string;
    neurl: string;
    gmreurl: string;
    oarurl: string;
    bootlevel: string;
    runlevel: string;
    folder: string;
    webserverdir: string;
    webserverurl: string;
    matrixsize_pss36: string;
    matrixsize_pss64: string;
    disableRC: boolean;
}
export interface MainResources {
    name: string;
    ovftemplate: string;
    vcenter: string;
}
