import { Tab, Tabs } from '@/components/DashboardTab';
import { AdminCreateSale } from './CreateSale';

import * as S from './styles';

export type HandleChange = {
  event: React.ChangeEvent<HTMLInputElement>;
}

export function Admin() {
  return (
    <S.Container>
      <S.Content>
        <Tabs
          menuContentProps={{
            style: {
              flexDirection: 'column',
              marginTop: 0,
            }
          }}
          tabContainerProps={{
            className: "tabcontainerclasse",
          }}
          menuContainerProps={{
            style: {
              marginTop: 0,
              maxWidth: 'max-content',
            }
          }}
        >
          <Tab title="Sales">
            <AdminCreateSale />
          </Tab>
          <Tab title="Air Drop NFTS">
            <span>text</span>
          </Tab>
        </Tabs>
      </S.Content>
    </S.Container>
  );
}