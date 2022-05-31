import {
  Card,
  Text,
  Input,
  Button,
  Code,
  Toggle,
  Modal,
  useModal,
  useToasts,
} from '@geist-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { HarperDBRecord } from 'types/interfaces';
import blockLogins from '@/lib/blockLogins';
import { mutate } from 'swr';
import deleteSite from '@/lib/deleteSite';

const AdvancedSettingsTab: React.FC<{ siteData: HarperDBRecord }> = ({
  siteData,
}) => {
  const { setVisible, bindings } = useModal();
  const [disableDeleteButton, setDisableDeleteButton] = useState(true);
  const [siteNameDeletingInput, setSiteNameDeletingInput] = useState('');
  const [isBlocked, setIsBlocked] = useState(siteData.is_login_blocked);
  const [_, setToast] = useToasts();
  const router = useRouter();

  useEffect(() => {
    if (siteNameDeletingInput === siteData.site_name) {
      setDisableDeleteButton(false);
    } else {
      setDisableDeleteButton(true);
    }
  }, [siteData.site_name, siteNameDeletingInput]);

  return (
    <div>
      <Card className='!mt-10'>
        <Text className='text-xl font-bold'>Block logins</Text>
        <Text p>
          Block logins temporarily. Existing logged in users will lose access to
          website once after the <Code>Login expiration time </Code> finishes
        </Text>
        <Text>
          The <Code>login expiration time </Code> can be changed in{' '}
          <Code> General Settings Tab </Code>
        </Text>
        <span>
          Allow logins
          <Toggle
            size='large'
            className='mx-3'
            initialChecked={siteData?.is_login_blocked}
            onChange={(e) => {
              setIsBlocked(e.target.checked);
            }}
          />
          Block logins
        </span>
        <Card.Footer className='!bg-warmgray-100'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>Please use 48 characters at maximum</Text>
            </div>
            <div>
              <Button
                size='small'
                type='secondary'
                auto
                onClick={async () => {
                  console.log(isBlocked);
                  const res = await blockLogins(isBlocked, siteData?.id);
                  if (isBlocked && res.success) {
                    setToast({
                      text: 'Logins blocked successfully',
                      type: 'warning',
                    });
                  } else if (!isBlocked && res.success) {
                    setToast({
                      text: 'Logins enabled successfully',
                      type: 'success',
                    });
                  } else {
                    setToast({
                      text: 'An unexpected error occured',
                      type: 'error',
                    });
                  }
                  mutate(
                    '/api/get-site-from-site-id/?siteId=' + siteData?.id,
                    { ...siteData, is_login_blocked: isBlocked },
                    false
                  );
                }}>
                Save
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      <Card className='!mt-10 !border !border-red-500'>
        <Text className='text-xl font-bold'>Delete site</Text>
        <Text p>
          <span className='text-red-500'>Permanently remove</span> this website
          and all of its contents from the StaticShield. This action is not
          reversible, so please continue with caution.
        </Text>
        <Text>
          Also do not forget to remove StaticShield&apos;s code from your
          website.
        </Text>
        <Card.Footer className='!bg-warmgray-100'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>This action is irreversible</Text>
            </div>
            <div>
              <Button
                size='small'
                type='error'
                auto
                onClick={() => setVisible(true)}>
                Delete permanantely
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>
      <Modal {...bindings}>
        <Modal.Title>Delete site</Modal.Title>
        <Modal.Subtitle>
          This deletion process cannot be reversed
        </Modal.Subtitle>
        <Modal.Content>
          Enter <Code>{siteData.site_name}</Code> to continue
          <Input
            width='100%'
            className='my-3 mt-5'
            label='Name of site →'
            onChange={(e) => setSiteNameDeletingInput(e.target.value)}
            onPaste={(e) => e.preventDefault()}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          type='error'
          onClick={() => {
            deleteSite(siteData.id)
              .then(() => {
                router.replace('/dashboard/?mutate=1');
                setToast({
                  text: `Successfully deleted ${siteData?.site_name}`,
                  type: 'success',
                });
              })
              .catch(() =>
                setToast({ text: 'An unexpected error occured', type: 'error' })
              );
          }}
          disabled={disableDeleteButton}>
          Delete
        </Modal.Action>
      </Modal>
    </div>
  );
};

export default AdvancedSettingsTab;
