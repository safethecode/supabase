import { observer } from 'mobx-react-lite'
import { FC, Fragment, useEffect, useState } from 'react'
import { Input, IconSearch, Listbox, Button, Divider, Modal, Form, IconHelpCircle } from 'ui'
import EncryptionKeySelector from './EncryptionKeySelector'
import InformationBox from 'components/ui/InformationBox'
import { useStore } from 'hooks'

interface Props {}

const EncryptionKeysManagement: FC<Props> = ({}) => {
  const { vault } = useStore()

  const [searchValue, setSearchValue] = useState<string>('')
  const [selectedSort, setSelectedSort] = useState<string>('name')
  const [showAddKeyModal, setShowAddKeyModal] = useState(false)
  const [selectedKeyToRemove, setSelectedKeyToRemove] = useState<any>()

  console.log('keys', vault.listKeys())

  return (
    <>
      <div className="space-y-4">
        <h3 className="text-scale-1200 mb-2 text-xl">Encryption Keys</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Input
              className="w-64"
              size="small"
              placeholder="Search"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              icon={<IconSearch strokeWidth={2} size={16} />}
            />
            <div className="w-32">
              <Listbox size="small" value={selectedSort} onChange={setSelectedSort}>
                <Listbox.Option id="name" value="name" label="Sort by name">
                  Name
                </Listbox.Option>
                <Listbox.Option id="createdAt" value="createdAt" label="Sort by created at">
                  Created at
                </Listbox.Option>
              </Listbox>
            </div>
          </div>
          <Button type="primary" onClick={() => setShowAddKeyModal(true)}>
            Add new key
          </Button>
        </div>

        {/* Table of secrets */}
        {/* <div className="border border-scale-500 rounded">
          {secrets.map((secret, idx) => {
            return (
              <Fragment key={secret.key_id}>
                <SecretRow secret={secret} onSelectRemove={setSelectedSecretToRemove} />
                {idx !== mockSecrets.length - 1 && <Divider light />}
              </Fragment>
            )
          })}
          {secrets.length === 0 && (
            <>
              {searchValue.length === 0 ? (
                <div className="px-6 py-6 space-y-1 flex flex-col items-center justify-center">
                  <p className="text-sm text-scale-1200">No secrets added yet</p>
                  <p className="text-sm text-scale-1100">
                    The Vault allows you to store sensitive information like API keys
                  </p>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-1">
                  <p className="text-sm text-scale-1200">No results found</p>
                  <p className="text-sm text-scale-1100">
                    Your search for "{searchValue}" did not return any results
                  </p>
                </div>
              )}
            </>
          )}
        </div> */}
      </div>

      <Modal
        closable
        size="small"
        alignFooter="right"
        visible={selectedKeyToRemove !== undefined}
        onCancel={() => setSelectedKeyToRemove(undefined)}
        onConfirm={() => setSelectedKeyToRemove(undefined)}
        header={<h5 className="text-sm text-scale-1200">Confirm to delete secret</h5>}
      >
        <div className="py-4">
          <Modal.Content>
            <div className="space-y-4">
              <p className="text-sm">
                The following secret will be permanently removed and cannot be recovered. Are you
                sure?
              </p>
              <div className="space-y-1">
                <p className="text-sm">{selectedKeyToRemove?.description}</p>
                <p className="text-sm text-scale-1100">
                  ID: <span className="font-mono">{selectedKeyToRemove?.key_id}</span>
                </p>
              </div>
            </div>
          </Modal.Content>
        </div>
      </Modal>

      <Modal
        closable
        hideFooter
        size="medium"
        visible={showAddKeyModal}
        onCancel={() => setShowAddKeyModal(false)}
        header={<h5 className="text-sm text-scale-1200">Add new secret</h5>}
      >
        <Form
          id="add-new-secret-form"
          initialValues={{ secret: '', description: '', keyId: '', newKeyName: '' }}
          validate={() => {}}
          onSubmit={() => {}}
        >
          {({ isSubmitting }: any) => {
            return (
              <div className="py-4">
                <Modal.Content>
                  <div className="space-y-4 pb-4">
                    <Input id="secret" label="Secret value" />
                    <Input id="description" label="Description" labelOptional="Optional" />
                  </div>
                </Modal.Content>
                <Modal.Separator />
                <Modal.Content>
                  <div className="py-4 space-y-4">
                    <EncryptionKeySelector
                      id="keyId"
                      labelOptional="Optional"
                      onSelectKey={(key) => console.log(key)}
                    />
                    <InformationBox
                      icon={<IconHelpCircle size={18} strokeWidth={2} />}
                      url="asd"
                      urlLabel="Vault documentation"
                      title="What is a Key ID?"
                      description={
                        <div className="space-y-2">
                          <p>
                            Every secret in the Vault is encrypted with a Key ID. The Vault comes
                            with a default value for this Key ID which is sufficient for simple
                            purposes.
                          </p>
                          <p>
                            However, you may also use a custom Key ID for more advanced use cases,
                            such as having different secrets visible to different users
                          </p>
                        </div>
                      }
                    />
                  </div>
                </Modal.Content>
                <Modal.Separator />
                <Modal.Content>
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      type="default"
                      disabled={isSubmitting}
                      onClick={() => setShowAddKeyModal(false)}
                    >
                      Cancel
                    </Button>
                    <Button htmlType="submit" disabled={isSubmitting} loading={isSubmitting}>
                      Add secret
                    </Button>
                  </div>
                </Modal.Content>
              </div>
            )
          }}
        </Form>
      </Modal>
    </>
  )
}

export default observer(EncryptionKeysManagement)
