import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, MapPin, Shield } from "lucide-react"
import Image from "next/image"

export default function Component() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Featured Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {/* Product Card 1 */}
          <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="iPhone 15 Pro Max"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500 text-white text-xs px-2 py-1">
                  50% OFF
                </Badge>
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                  iPhone 15 Pro Max 256GB Natural Titanium - Garansi Resmi iBox
                </h3>

                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-lg font-bold text-gray-900">Rp15.999.000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 line-through">Rp31.999.000</span>
                    <Badge variant="outline" className="text-xs px-1 py-0 h-5 text-red-600 border-red-200">
                      50%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">(4.8)</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">250+ terjual</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>Jakarta Pusat</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-green-100 text-green-700 hover:bg-green-100"
                  >
                    Tokopedia
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2 py-1 text-orange-600 border-orange-200">
                    COD
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Card 2 */}
          <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Samsung Galaxy S24"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-blue-500 hover:bg-blue-500 text-white text-xs px-2 py-1">
                  CASHBACK
                </Badge>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                  Samsung Galaxy S24 Ultra 512GB Titanium Black - Garansi Resmi SEIN
                </h3>

                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-lg font-bold text-gray-900">Rp18.999.000</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">(5.0)</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">150+ terjual</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>Surabaya</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-green-100 text-green-700 hover:bg-green-100"
                  >
                    Power Merchant
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2 py-1 text-blue-600 border-blue-200">
                    Bebas Ongkir
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Card 3 */}
          <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="MacBook Air M3"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-purple-500 hover:bg-purple-500 text-white text-xs px-2 py-1">
                  PROMO
                </Badge>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                  MacBook Air M3 13 inch 8GB 256GB SSD - Space Gray
                </h3>

                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-lg font-bold text-gray-900">Rp16.999.000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 line-through">Rp18.999.000</span>
                    <Badge variant="outline" className="text-xs px-1 py-0 h-5 text-red-600 border-red-200">
                      11%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">(4.9)</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">89 terjual</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>Bandung</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-green-100 text-green-700 hover:bg-green-100"
                  >
                    Official Store
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2 py-1 text-green-600 border-green-200">
                    Gojek
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Card 4 */}
          <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="AirPods Pro"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-500 text-white text-xs px-2 py-1">
                  TERLARIS
                </Badge>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                  Apple AirPods Pro 2nd Generation with MagSafe Case
                </h3>

                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-lg font-bold text-gray-900">Rp3.799.000</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= 5 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">(4.9)</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">500+ terjual</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>Jakarta Barat</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-green-100 text-green-700 hover:bg-green-100"
                  >
                    Tokopedia
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2 py-1 text-purple-600 border-purple-200">
                    Plus
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Card 5 */}
          <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="relative">
                <Image
                  src="/placeholder.svg?height=200&width=200"
                  alt="Gaming Chair"
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-500 text-white text-xs px-2 py-1">
                  FLASH SALE
                </Badge>
              </div>

              <div className="p-3">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
                  Gaming Chair Kursi Gaming RGB LED Ergonomic Pro Series
                </h3>

                <div className="mb-2">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-lg font-bold text-gray-900">Rp1.299.000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 line-through">Rp2.599.000</span>
                    <Badge variant="outline" className="text-xs px-1 py-0 h-5 text-red-600 border-red-200">
                      50%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3 h-3 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">(4.7)</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-600">1rb+ terjual</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <MapPin className="w-3 h-3" />
                  <span>Tangerang</span>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    variant="secondary"
                    className="text-xs px-2 py-1 bg-green-100 text-green-700 hover:bg-green-100"
                  >
                    Power Merchant
                  </Badge>
                  <Badge variant="outline" className="text-xs px-2 py-1 text-red-600 border-red-200">
                    Same Day
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
