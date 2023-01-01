import { Drawer } from 'antd'

import {
  AdminUpdateCategoryMutationOptions,
  useAdminUpdateCategoryMutation,
  Category,
} from '../../__generated__/types.react-apollo'
import { UpdateCategoryForm } from '../form/update-category-form'

interface UpdateCategoryDrawerProps {
  visible: boolean
  onCompleted: AdminUpdateCategoryMutationOptions['onCompleted']
  onClose: () => void
  category: Category | null
}

export function UpdateCategoryDrawer({
  visible,
  onCompleted,
  onClose,
  category,
}: UpdateCategoryDrawerProps) {
  const [update, { loading: isUpdating }] = useAdminUpdateCategoryMutation({
    onCompleted,
  })

  return (
    <Drawer
      width={500}
      placement="right"
      visible={visible}
      forceRender
      onClose={onClose}
      title="Update Category"
      className="max-w-full"
      contentWrapperStyle={{
        maxWidth: '100%',
      }}
    >
      <UpdateCategoryForm
        onSubmit={update}
        isLoading={isUpdating}
        initialValue={category}
      />
    </Drawer>
  )
}

export default UpdateCategoryDrawer
