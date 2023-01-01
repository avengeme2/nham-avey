import { Drawer } from 'antd'

import {
  AdminUpdateUserMutationOptions,
  useAdminUpdateUserMutation,
  User,
} from '../../__generated__/types.react-apollo'
import { UpdateUserForm } from '../form/update-user-form'

interface UpdateUserDrawerProps {
  visible: boolean
  onCompleted: AdminUpdateUserMutationOptions['onCompleted']
  onClose: () => void
  user: User
}

export function UpdateUserDrawer({
  visible,
  onCompleted,
  onClose,
  user,
}: UpdateUserDrawerProps) {
  const [update, { loading: isUpdating }] = useAdminUpdateUserMutation({
    onCompleted,
  })

  return (
    <Drawer
      width={500}
      placement="right"
      visible={visible}
      forceRender
      onClose={onClose}
      title="Update User"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: '100%',
      }}
    >
      <UpdateUserForm
        onSubmit={update}
        isLoading={isUpdating}
        initialValue={user}
      />
    </Drawer>
  )
}

export default UpdateUserDrawer
