import { Injectable } from '@nestjs/common'
import DataLoader from 'dataloader'

import { CategoryService } from './category.service'

@Injectable()
export class CategoryLoader {
  constructor(private readonly categoryService: CategoryService) {}

  readonly countRestaurantByEachCategoryId = new DataLoader(
    async (categoryIds: readonly number[]) => {
      const countResult =
        await this.categoryService.countRestaurantByEachCategoryId(
          categoryIds as number[],
        )

      const resultMap = new Map(
        countResult.map(result => [result.categoryId, result.count]),
      )
      return categoryIds.map(categoryId => resultMap.get(categoryId))
    },
  )
}
