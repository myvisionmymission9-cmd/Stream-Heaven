import 'package:flutter/material.dart';

import '../../../../../l10n/l10n_context.dart';
import '../domain/home_feed_models.dart';

class CreatorMetadataOverlay extends StatelessWidget {
  const CreatorMetadataOverlay({
    super.key,
    required this.item,
    required this.onFollow,
  });

  final HomeFeedItem item;
  final VoidCallback onFollow;

  @override
  Widget build(BuildContext context) {
    final l10n = context.l10n;
    final author = item.author;
    final following = author.isFollowing;

    return Positioned(
      left: 12,
      right: 88,
      bottom: 88,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            children: [
              Text(
                '@${author.handle}',
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                  fontSize: 16,
                  shadows: [Shadow(color: Colors.black54, blurRadius: 4)],
                ),
              ),
              if (author.isVerified) ...[
                const SizedBox(width: 4),
                const Icon(Icons.verified, color: Colors.blueAccent, size: 16),
              ],
              const SizedBox(width: 8),
              GestureDetector(
                onTap: onFollow,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.white),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: Text(
                    following ? l10n.feedFollowing : l10n.feedFollow,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          if (item.caption.isNotEmpty)
            Text(
              item.caption,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 14,
                shadows: [Shadow(color: Colors.black54, blurRadius: 4)],
              ),
            ),
          if (item.soundTitle != null) ...[
            const SizedBox(height: 8),
            Row(
              children: [
                const Icon(Icons.music_note, color: Colors.white, size: 14),
                const SizedBox(width: 4),
                Expanded(
                  child: Text(
                    item.soundTitle!,
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(color: Colors.white70, fontSize: 12),
                  ),
                ),
              ],
            ),
          ],
          if (item.cryptoSymbol != null) ...[
            const SizedBox(height: 8),
            Text(
              '${item.cryptoSymbol} ${item.cryptoChangePct != null ? (item.cryptoChangePct! >= 0 ? '+' : '') : ''}${item.cryptoChangePct?.toStringAsFixed(1) ?? ''}%',
              style: TextStyle(
                color: (item.cryptoChangePct ?? 0) >= 0 ? Colors.greenAccent : Colors.redAccent,
                fontSize: 13,
                fontWeight: FontWeight.w600,
              ),
            ),
            Text(
              l10n.feedCryptoDisclaimer,
              style: const TextStyle(color: Colors.white54, fontSize: 10),
            ),
          ],
        ],
      ),
    );
  }
}
