import { useEffect } from 'react'

import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'

import {
  OrderStatus,
  useEditOrderMutation,
  useGetOrderQuery,
  useMeQuery,
  UserRole,
} from '../../__generated__/grapql.react-query'

const OrderPage: NextPage = () => {
  const router = useRouter()
  const id = +(router.query.id as string)

  const { data: userData } = useMeQuery()
  const { mutate: editOrder } = useEditOrderMutation()
  const { data } = useGetOrderQuery({ input: { id: id.toString() } })

  useEffect(() => {
    if (data?.getOrder.ok) {
      // subscribeToMore({
      //   document: OrderUpdatesDocument,
      //   variables: {
      //     input: {
      //       id: +id,
      //     },
      //   },
      //   updateQuery: (
      //     prev,
      //     {
      //       subscriptionData: { data },
      //     }: { subscriptionData: { data: OrderUpdatesSubscription } },
      //   ) => {
      //     if (!data) return prev
      //     return {
      //       getOrder: {
      //         ...prev.getOrder,
      //         order: {
      //           ...data.orderUpdates,
      //         },
      //       },
      //     }
      //   },
      // })
    }
  }, [data, id])

  const onButtonClick = (newStatus: OrderStatus) => {
    editOrder({
      input: {
        id: id.toString(),
        status: newStatus,
      },
    })
  }

  return (
    <div className="container mt-32 flex justify-center">
      <NextSeo title={`Order ${id} | Nham Avey`} />
      <div className="flex w-full max-w-screen-sm flex-col justify-center border border-gray-800">
        <h4 className="text-hite w-full bg-gray-800 py-5 text-center text-xl">
          Order #{id}
        </h4>
        <h5 className="p-5 pt-10 text-center text-3xl">
          ${data?.getOrder.order?.total}
        </h5>

        <div className="grid gap-6 p-5 text-xl">
          <div className="border-gra-y-700 border-t pt-5">
            Prepared By:{' '}
            <span className="font-medium">
              {data?.getOrder.order?.restaurant?.name}
            </span>
          </div>
          <div className="border-t border-gray-700 pt-5 ">
            Deliver To:{' '}
            <span className="font-medium">
              {data?.getOrder.order?.customer?.email}
            </span>
          </div>
          <div className="border-t border-b border-gray-700 py-5">
            Driver:{' '}
            <span className="font-medium">
              {data?.getOrder.order?.driver?.email || 'Not yet.'}
            </span>
          </div>
          {userData?.me.roles.includes(UserRole.Customer) && (
            <span className="mt-5 mb-3 text-center text-2xl text-lime-600">
              Order Status: {data?.getOrder.order?.status}
            </span>
          )}
          {userData?.me.roles.includes(UserRole.Vendor) && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Pending && (
                <button
                  className="btn"
                  onClick={() => onButtonClick(OrderStatus.Cooking)}
                >
                  Accept Order
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.Cooking && (
                <button
                  className="btn"
                  onClick={() => onButtonClick(OrderStatus.Cooked)}
                >
                  Order Cooked
                </button>
              )}

              {data?.getOrder.order?.status !== OrderStatus.Cooking &&
                data?.getOrder.order?.status !== OrderStatus.Pending && (
                  <span className="font-medium">
                    Status {data?.getOrder.order?.status}
                  </span>
                )}
            </>
          )}

          {userData?.me.roles.includes(UserRole.Driver) && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Cooked && (
                <button
                  className="btn"
                  onClick={() => onButtonClick(OrderStatus.PickedUp)}
                >
                  Picked UP
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.PickedUp && (
                <button
                  className="btn"
                  onClick={() => onButtonClick(OrderStatus.Delivered)}
                >
                  Order Delivered
                </button>
              )}
            </>
          )}

          {data?.getOrder.order?.status === OrderStatus.Delivered && (
            <span className="font-medium">Thank you for using Nuber Eats</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrderPage
