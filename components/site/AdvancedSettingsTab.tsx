import {
  Card,
  Text,
  Input,
  Button,
  Code,
  Toggle,
  Modal,
  useModal,
} from '@geist-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function AdvancedSettingsTab() {
  const { visible, setVisible, bindings } = useModal();
  const [disableDeleteButton, setDisableDeleteButton] = useState(true);
  const [siteName, setSiteName] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (siteName === "Acme's employee register") {
      setDisableDeleteButton(false);
    } else {
      setDisableDeleteButton(true);
    }
  }, [siteName]);

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
            onChange={(e) => console.log(e.target)}
          />
          Block logins
        </span>
        <Card.Footer className='!bg-warmgray-100'>
          <div className='flex items-center justify-between w-full'>
            <div>
              <Text>Please use 48 characters at maximum</Text>
            </div>
            <div>
              <Button size='small' type='secondary' auto>
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
        <Modal.Subtitle>This deletion processcannot be reversed</Modal.Subtitle>
        <Modal.Content>
          Enter <Code>{"Acme's employee register"}</Code> to continue
          <Input
            width='100%'
            className='my-3 mt-5'
            label='Name of site →'
            onChange={(e) => setSiteName(e.target.value)}
            onPaste={(e) => e.preventDefault()}
          />
        </Modal.Content>
        <Modal.Action passive onClick={() => setVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action
          type='error'
          onClick={() => {
            console.log('Done deleting');
            router.push('/dashboard');
          }}
          disabled={disableDeleteButton}>
          Delete
        </Modal.Action>
      </Modal>
    </div>
  );
}
