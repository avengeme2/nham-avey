import { Drawer } from 'antd'

import {
  AdminUpdateRestaurantMutationOptions,
  Restaurant,
  useAdminUpdateRestaurantMutation,
} from '../../__generated__/types.react-apollo'
import { UpdateRestaurantForm } from '../form/update-restaurant-form'

interface UpdateRestaurantDrawerProps {
  restaurant: Restaurant | null
  visible: boolean
  onCompleted: AdminUpdateRestaurantMutationOptions['onCompleted']
  onClose: () => void
}

export function UpdateRestaurantDrawer({
  restaurant,
  visible,
  onCompleted,
  onClose,
}: UpdateRestaurantDrawerProps) {
  const [update, { loading: isUpdating }] = useAdminUpdateRestaurantMutation({
    onCompleted,
  })

  return (
    <Drawer
      width={500}
      placement="right"
      visible={visible}
      forceRender
      onClose={onClose}
      title="Update Restaurant"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: '100%',
      }}
    >
      <UpdateRestaurantForm
        initialValue={restaurant}
        onSubmit={update}
        isLoading={isUpdating}
      />
    </Drawer>
  )
}

export default UpdateRestaurantDrawer
