import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, RequestOptions } from '@angular/http';
import { APIService } from './apiservice.service';
import { SelectOpion } from '../model/v1830.model';
@Injectable()
export class UtilService {
    token: string;
    _version: string;
    shelfModeWDM: SelectOpion[] = [
        { value: 'SONET', viewValue: 'SONET' },
        { value: 'SDH', viewValue: 'SDH' }
    ];
    shelfModeOCS: SelectOpion[] = [
        { value: 'ETSI', viewValue: 'ETSI' },
        { value: 'ANSI', viewValue: 'ANSI' }
    ];
    matrixSizeForPSS36: SelectOpion[] = [
        { value: '960', viewValue: '960' },
        { value: '1920', viewValue: '1920' }
    ];
    matrixSizeForPSS64: SelectOpion[] = [
        { value: '3840', viewValue: '3840' },
        { value: '1920', viewValue: '1920' }
    ];
    bootlevel: SelectOpion[] = [
        { value: 'clear', viewValue: 'Clear' },
        { value: 'load', viewValue: 'Load' },
        { value: 'install', viewValue: 'Install' },
        { value: 'drivers', viewValue: 'Drivers' },
        { value: 'ready', viewValue: 'Ready' }
    ];
    runlevel: SelectOpion[] = [
        { value: 'stop', viewValue: 'Stop' },
        { value: 'start', viewValue: 'Start' },
        { value: 'commission', viewValue: 'Commission' }
    ];
    ramunit: SelectOpion[] = [
        { value: 'gb', viewValue: 'GB' },
        { value: 'mb', viewValue: 'MB' }
    ];
    diskmodeopt: SelectOpion[] = [
        { value: 'nomode', viewValue: 'Datastore Default' },
        { value: 'thin', viewValue: 'Thin Provision' },
        { value: 'thick', viewValue: 'Thick Provision Lazy Zeroed' },
        { value: 'eagerZeroedThick', viewValue: 'Thick Provision Eager Zeroed' }
    ];
    wdmshelftype: string[] = ['PSS32', 'PSS16', 'PSS16II', 'PSS8', 'PSS4', 'PSS8x', 'PSS24x', 'PSS12x', 'PSI2T', 'PSIM'];
    ocsshelftype: string[] = ['PSS36', 'PSS64'];
    constructor(private router: Router ) {
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    authenticationFailed(err) {
        console.log('authenticationFailed --- ', err);
        if (err == '404' || err == '401' || err == '500') {
            alert('Authentication Failed');
            this.router.navigate(['/login']);
        } else if (err == '400') {
            alert('Bad Request. The server received an invalid response from the server.');
        } else if (err == '408') {
            alert('Request Timeout');
        } else if (err == '204') {
            alert('Empty Response');
        } else if (err == '503') {
            alert('Service Unavailable.');
        } else if (err == '599') {
            alert('Network connect timeout error.');
        } else if (err == '502') {
            alert('Bad Gateway.');
        } else if (err == '504') {
            alert('Gateway Timeout.');
        } else if (err == '507') {
            alert('The Server is unable to store the representation needed to complete the request.');
        } else if (err == '414' || err == '413') {
            alert('Request-url Too Long.');
        } else if (err == '415') {
            alert('Unsupported Media Type.');
        } else if (err == '403') {
            alert('Access is forbidden to the requested page.');
        } else if (err == '0') {
            alert('Server Down');
            this.router.navigate(['/login']);
        } else {
            return;
        }
    }

    buildHeaders(): RequestOptions {
        const headers = new Headers();
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        headers.append('x-access-token', this.token);
        const options = new RequestOptions({ headers: headers });
        return options;
    }

    log(message1: any): void {
        console.log(message1);
    }

    log2(message1: string, message2: any): void {
        console.log(message1, message2);
    }

    getShelfModeValue(product: string): Array<SelectOpion> {
        return product == 'WDM' ? this.shelfModeWDM : this.shelfModeOCS;
    }

    getShelfModeLabel(product: string): string {
        return product == 'WDM' ? 'Shelf Mode' : 'Region Mode';
    }

    getShelfTypeValue(product: string): Array<string> {
        return product == 'WDM' ? this.wdmshelftype : this.ocsshelftype;
    }

    showPorts(product: string): boolean {
        return product == 'WDM' ? true : false;
    }

    getLoadLabel(product: string): string {
        return product == 'WDM' ? 'OAR' : 'ZIC';
    }

    getDefaultLoadValue(product: string): string {
        return product == 'WDM' ? 'https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/OAR/' : 'https://virtual1830.es-si-s3-z2.eecloud.nsn-net.net/loads/ZIC/';
    }

    getRAMValidation(ramsize: number, ramunit: string): boolean {
        return ((ramunit == 'mb' && (ramsize < 4 || ramsize > 1035264)) || (ramunit == 'gb' && (ramsize < 1 || ramsize > 1011))) ? true : false;
    }

    getADDData(forwhat, resources, simulations, networks, deployments, simbuilders): any {
        let localinstallt = 'False';
        if (simulations.localinstall) {
            localinstallt = 'True';
        }
        const ramsize = deployments.ramsize * 1024;
        if (forwhat == 'DB') {
            return  {
                name: resources.name,
                vcenter: resources.vcenter.name,
                mqttserver: resources.mqttserver,
                folder: resources.folder,
                localinstall: localinstallt,
                datacenter: resources.datacenter,
                vcenteruser: resources.vcenter.username + ':' + resources.vcenter.password,
                datastore: resources.datastore,
                cluster: resources.hostcluster,
                network: resources.network,
                netgmre: resources.networkgmre,
                netoamp: networks.netoamp,
                nete1: networks.nete1,
                nete2: networks.nete2,
                nete3: networks.nete3,
                ovfdefault: resources.ovf.name,
                netvoip: networks.netvoip,
                netilan: networks.netilan,
                netcit: networks.netcit,
                netauxa: networks.netauxa,
                netauxb: networks.netauxs,
                nocores: deployments.numberofcores,
                ramsize: deployments.ramsize,
                ramunit: deployments.ramunit,
                diskmode: deployments.diskmode,
                mainshelf: simulations.mastershelftype,
                shelfmode: simulations.shelfmode,
                matrixsize_pss36: simulations.matrixsizepss36,
                matrixsize_pss64: simulations.matrixsizepss64,
                neurl: simulations.neload,
                gmreurl: simulations.gmreload,
                oarurl: simulations.oarload,
                bootlevel: simulations.bootlevel,
                runlevel: simulations.runlevel,
                webserverdir: simbuilders.webserverdirectory,
                webserverurl: simbuilders.webserverurl,
                disableRC: false
            };
        } else {
            return {
                name: resources.name,
                vcenter: resources.vcenter.ipaddress,
                datacenter: resources.datacenter,
                vcenteruser: resources.vcenter.username + ':' + resources.vcenter.password,
                mqttserver: resources.mqttserver,
                datastore: resources.datastore,
                cluster: resources.hostcluster,
                network: resources.network,
                netgmre: resources.networkgmre,
                ovfdefault: resources.ovf.url,
                folder: resources.folder,
                ovfproduct: resources.ovf.product,
                netoamp: networks.netoamp,
                nete1: networks.nete1,
                nete2: networks.nete2,
                nete3: networks.nete3,
                netvoip: networks.netvoip,
                netilan: networks.netilan,
                netcit: networks.netcit,
                netauxa: networks.netauxa,
                netauxb: networks.netauxs,
                nocores: deployments.numberofcores,
                ramsize: ramsize,
                mainshelf: simulations.mastershelftype,
                shelfmode: simulations.shelfmode,
                localinstall: localinstallt,
                neurl: simulations.neload,
                gmreurl: simulations.gmreload,
                oarurl: simulations.oarload,
                bootlevel: simulations.bootlevel,
                runlevel: simulations.runlevel,
                matrixsize_pss36: simulations.matrixsizepss36,
                matrixsize_pss64: simulations.matrixsizepss64,
                webserverdir: simbuilders.webserverdirectory,
                webserverurl: simbuilders.webserverurl
            };
        }
    }

    getDeployObject(deploydata, username, rcname, product) {
        const sendValues = {
			rc: rcname,
			vmname: deploydata.vmname, ipaddress: deploydata.ipaddress, username: username, product: product
		};
		if (deploydata.neloadurl != '') {
			sendValues['nfsmount'] = deploydata.neloadurl;
		}
		if (deploydata.nebuild != '') {
			sendValues['nebuild'] = deploydata.nebuild;
		}
		sendValues['mainshelf'] = deploydata.mastershelftype;
        sendValues['mode'] = deploydata.shelfmode;
        sendValues['matrixsize'] = deploydata.matrixsize;
		if (deploydata.localinstall) {
			sendValues['copylocally'] = 'True';
		}
		if (deploydata.valgrind) {
			sendValues['enablevalgrind'] = 'True';
		}
		if (deploydata.nodetid != '') {
			sendValues['nodetid'] = deploydata.nodetid;
		}
		if (deploydata.loopbackip != '') {
			sendValues['loopback'] = deploydata.loopbackip;
		}
		if (deploydata.bootlevel != '') {
			sendValues['simbootlevel'] = deploydata.bootlevel;
		}
		if (deploydata.runlevel == 'ready') {
			sendValues['simrunlevel'] = deploydata.runlevel;
		}
		if (deploydata.configuregmre) {
			if (deploydata.gmrebuild !== '') {
				sendValues['gmrebuild'] = deploydata.gmrebuild;
			}
			if (deploydata.gmreloadurl != '') {
				sendValues['gmreloadurl'] = deploydata.gmreloadurl;
			}
			if (deploydata.gmrenodeip != '') {
				sendValues['nodeip'] = deploydata.gmrenodeip;
			}
			if (deploydata.gmrenotifyip != '') {
				sendValues['notifyip'] = deploydata.gmrenotifyip;
			}
			if (deploydata.activategmre) {
				sendValues['enablegmre'] = deploydata.activategmre;
			}
		}
		if (deploydata.configureoar) {
			if (deploydata.oarbuild != '') {
				sendValues['oarbuild'] = deploydata.oarbuild;
			}
			if (deploydata.oarloadurl != '') {
				sendValues['oarloadurl'] = deploydata.oarloadurl;
			}
			if (deploydata.activateoar) {
				sendValues['enableoar'] = deploydata.activateoar;
			}
		}

		if (deploydata.noofcores > 1 && deploydata.noofcores < 9) {
			sendValues['nocores'] = deploydata.noofcores;
		}

		if ((deploydata.ramunit == 'mb' && (deploydata.ramsize > 3 && deploydata.ramsize < 1035265))
			|| (deploydata.ramunit == 'gb' && (deploydata.ramsize > 0 && deploydata.ramsize < 1010))) {
			let temp = deploydata.ramsize;
			if (deploydata.ramunit == 'gb') {
				temp = deploydata.ramsize * 1024;
			}
			if (temp != 2048) {
				sendValues['ramsize'] = temp;
			}
		}
		if (deploydata.keeplcec) {
			sendValues['keep'] = 'yes';
		} else {
			sendValues['keep'] = 'no';
        }
        return sendValues;
    }
    getversion(): string {
        return this._version;
    }

    setversion(value: string) {
        this._version = value;
    }
}
