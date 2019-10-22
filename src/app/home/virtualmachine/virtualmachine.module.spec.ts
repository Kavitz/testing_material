import { VirtualmachineModule } from './virtualmachine.module';

describe('VirtualmachineModule', () => {
  let virtualmachineModule: VirtualmachineModule;

  beforeEach(() => {
    virtualmachineModule = new VirtualmachineModule();
  });

  it('should create an instance', () => {
    expect(virtualmachineModule).toBeTruthy();
  });
});
