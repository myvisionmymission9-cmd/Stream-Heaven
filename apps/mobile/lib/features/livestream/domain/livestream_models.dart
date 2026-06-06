class LiveRoomSummary {
  const LiveRoomSummary({
    required this.roomId,
    required this.hostUserId,
    required this.title,
    required this.status,
    required this.viewerCount,
  });

  factory LiveRoomSummary.fromJson(Map<String, dynamic> json) {
    return LiveRoomSummary(
      roomId: json['roomId'] as String,
      hostUserId: json['hostUserId'] as String,
      title: json['title'] as String,
      status: json['status'] as String,
      viewerCount: (json['viewerCount'] as num?)?.toInt() ?? 0,
    );
  }

  final String roomId;
  final String hostUserId;
  final String title;
  final String status;
  final int viewerCount;
}
